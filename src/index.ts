import p from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import micromatch from 'micromatch';
import { optimize, Config as SvgoOptimizeOptions } from 'svgo';
import { Plugin } from 'vite';
import { svgToSymbol } from './svg-to-symbol.js';

const { stringify } = JSON;

const exportTypes = ['vanilla', 'react', 'vue'] as const;

export type { SvgoOptimizeOptions };
export interface SvgSpriteOptions {
  include?: string[] | string;
  symbolId?: string;
  svgo?: SvgoOptimizeOptions;
  exportType?: (typeof exportTypes)[number];
  moduleSideEffects?: boolean;
}

function getHash(content: string) {
  const h = crypto.createHash('sha256');
  h.update(content);
  return h.digest('hex');
}

export default (options?: SvgSpriteOptions) => {
  const match = options?.include ?? '**.svg';
  const svgoOptions = options?.svgo;

  const plugin: Plugin = {
    name: 'svg-sprite',

    async transform(src, filepath) {
      if (!micromatch.isMatch(filepath, match, {
        dot: true,
      })) {
        return undefined;
      }

      const code = await fs.promises.readFile(filepath, 'utf-8');

      const hash = getHash(code).slice(0, 8);

      const { name } = p.parse(filepath);

      const optimizedSvg = optimize(code, {
        ...svgoOptions,
        plugins: [
          {
            name: 'prefixIds',
            params: {
              prefix: hash,
            },
          },
          ...svgoOptions?.plugins ?? [],
        ],
      }).data;

      const symbolId = (options?.symbolId ?? 'icon-[name]').replace(/\[hash\]/g, hash).replace(/\[name\]/g, name);

      const symbolResults = svgToSymbol(optimizedSvg, symbolId);

      if (!symbolResults) {
        throw new Error(`invalid svg file: ${filepath}`);
      }

      const { symbolXml, attributes } = symbolResults;

      let exportType = options?.exportType;
      if (!exportType || !exportTypes.includes(exportType)) {
        exportType = 'vanilla';
      }

      const codeToReturn = `
        import addSymbol from 'vite-plugin-svg-sprite/runtime/inject.js';
        import { adapter } from 'vite-plugin-svg-sprite/runtime/adapters/${exportType}.js';
        const id = ${stringify(symbolId)};
        const name = ${stringify(name)};
        const symbolXml = ${stringify(symbolXml)};
        const { dispose } = addSymbol(symbolXml, id);
        
        export default adapter(id, name);
        export const attributes = ${stringify(attributes)}

        if (import.meta.hot) {
          import.meta.hot.dispose(dispose);
          import.meta.hot.accept();
        }
      `;

      return {
        code: codeToReturn,
        moduleSideEffects: options?.moduleSideEffects ?? true,
        map: { mappings: '' },
      };
    },
  };

  return plugin;
};
