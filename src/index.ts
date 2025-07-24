import p from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import micromatch from 'micromatch';
import { optimize, Config as SvgoOptimizeOptions } from 'svgo';
import { Plugin } from 'vite';
import { svgToSymbol } from './svg-to-symbol.js';

const { stringify } = JSON;

const exportTypes = ['vanilla', 'react', 'vue'] as const;

export interface DefaultExportType {
  exportType?: (typeof exportTypes)[number];
}

interface AdapterOptions {
  id: string;
  name: string;
  symbolXml: string;
  attributes: {
    width?: string | null;
    height?: string | null;
    viewBox?: string | null;
  }
}

export interface CustomExportType {
  exportType: 'custom';
  adapter: (options: AdapterOptions) => unknown;
}

type ExportType = DefaultExportType | CustomExportType;

export type { SvgoOptimizeOptions };

export interface BaseSvgSpriteOptions {
  include?: string[] | string;
  symbolId?: string;
  svgo?: SvgoOptimizeOptions;
  moduleSideEffects?: boolean;
}

type SvgSpriteOptions = BaseSvgSpriteOptions & ExportType;

function getHash(content: string) {
  const h = crypto.createHash('sha256');
  h.update(content);
  return h.digest('hex');
}

function prepareTemplate(props: { adapterImport?: string; adapter: string }) {
  return (options: AdapterOptions) => `
      import addSymbol from 'vite-plugin-svg-sprite/runtime/inject.js';
      ${props.adapterImport ?? ''}

      const id = ${stringify(options.id)};
      const name = ${stringify(options.name)};
      const symbolXml = ${stringify(options.symbolXml)};
      const { dispose } = addSymbol(symbolXml, id);
      
      export default ${props.adapter};
      export const attributes = ${stringify(options.attributes)}

      if (import.meta.hot) {
        import.meta.hot.dispose(dispose);
        import.meta.hot.accept();
      }
    `;
}

function getModuleTemplate(type: ExportType = {}) {
  if (type.exportType === 'custom') {
    if (!type.adapter) {
      throw new Error('Export type is set to "custom", but adapter is not provided. Please add "adapter" option in config.')
    }

    return prepareTemplate({ adapter: type.adapter.toString() });
  }

  const { exportType = 'vanilla' } = type;

  if (!exportTypes.includes(exportType)) {
    throw new Error('Unknown export type, supported types: "custom", "react", "vanilla", "vue".');
  }

  return prepareTemplate({
    adapterImport: `import { adapter } from 'vite-plugin-svg-sprite/runtime/adapters/${exportType}.js';`,
    adapter: 'adapter(id, name)'
  });
}

export default (options?: SvgSpriteOptions) => {
  const match = options?.include ?? '**.svg';
  const svgoOptions = options?.svgo;

  const moduleTemplate = getModuleTemplate(options);

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

      return {
        code: moduleTemplate({ id: symbolId, name, symbolXml, attributes }),
        moduleSideEffects: options?.moduleSideEffects ?? true,
        map: { mappings: '' },
      };
    },
  };

  return plugin;
};
