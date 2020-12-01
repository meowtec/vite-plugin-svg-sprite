import p from 'path';
import fs from 'fs';
import crypto from 'crypto';
import micromatch from 'micromatch';
import SVGCompiler from 'svg-baker';
import Svgo, { Options as SvgoOptions } from 'svgo';
import { Transform } from 'vite';

const { stringify } = JSON;

export interface SvgSpriteOptions {
  include?: string[] | string;
  symbolId?: string;
  svgo?: boolean | SvgoOptions;
}

export default (options?: SvgSpriteOptions) => {
  const svgCompiler = new SVGCompiler();
  const match = options?.include ?? '**.svg';
  let svgo: Svgo | null;
  if (options?.svgo !== false) {
    svgo = new Svgo(options?.svgo === true ? {} : options?.svgo);
  }

  const svgSpriteTransform: Transform = {
    test({ path }) {
      return micromatch.isMatch(path, match);
    },

    async transform({ path }) {
      const { name } = p.parse(path);
      let code = await fs.promises.readFile(path, 'utf-8');
      if (svgo) {
        code = (await svgo.optimize(code)).data;
      }

      let id = name;

      if (options?.symbolId) {
        id = options.symbolId;

        if (id.includes('[hash]')) {
          const hash = crypto.createHash('sha256');
          hash.update(code);
          id = id.replace(/\[hash\]/g, hash.digest('hex').slice(0, 6));
        }

        id = id.replace(/\[name\]/g, name);
      }

      const symbol = await svgCompiler.addSymbol({
        id,
        content: code,
        path,
      });

      return `
        import addSymbol from 'vite-plugin-svg-sprite/es/runtime';
        addSymbol(${stringify(symbol.render())}, ${stringify(id)});
        export default ${stringify(id)};
      `;
    },
  };

  return {
    transforms: [
      svgSpriteTransform,
    ],
  };
};
