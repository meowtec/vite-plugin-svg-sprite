# vite-plugin-svg-sprite

> A Vite plugin for importing SVG files as SVG sprite symbols or components.

## Installation

You can install the plugin using npm, pnpm, or yarn:

```bash
npm install vite-plugin-svg-sprite --save-dev
# or
pnpm add vite-plugin-svg-sprite --save-dev
# or
yarn add vite-plugin-svg-sprite --dev
```

## How to Use

To use the plugin, import and configure it in your Vite configuration file (`vite.config.js|ts`):

```javascript
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

const config = {
  plugins: [
    createSvgSpritePlugin({
      exportType: 'vanilla', // or 'react' or 'vue'
      include: '**/icons/*.svg'
    }),
  ],
}
```

### React

For React projects, set the `exportType` to `'react'` to import SVGs as components:

```javascript
import IconFoo from './icons/foo.svg';

<IconFoo />
```

This may seem similar to `svgr` but internally they are different.

`vite-plugin-svg-sprite` usually has a better render performance.

### Vue

For Vue projects, set the `exportType` to `'vue'` to import SVGs as components:

```javascript
import IconFoo from './icons/foo.svg';

<IconFoo />
```

### Non-React / Non-Vue

For users not using React or Vue, set the `exportType` to `'vanilla'`. The imported value will be the `symbolId`, which can be used with SVG `<use>`:

```javascript
import IconFoo from './icons/foo.svg';
const html = `
  <svg>
    <use href="#${IconFoo}" />
  </svg>
`;
```

### TypeScript Users

To get proper type hints in TypeScript, include the appropriate type definitions in your `tsconfig.json`:

```json
"types": [
  // or "vite-plugin-svg-sprite/typings/react" | "vite-plugin-svg-sprite/typings/vue"
  "vite-plugin-svg-sprite/typings/vanilla"
],
```

## API Configuration Options

- **symbolId**: (`string`, optional) Controls the generated symbol ID. Default is `'icon-[name]'`.

- **exportType**: (`'vanilla' | 'react' | 'vue'`, optional) Determines the type of the exported value. Default is `'vanilla'`.
  - If set to `'vanilla'`, the value will be the `symbolId`.
  - If set to `'react'`, the value will be a React component.
  - If set to `'vue'`, the value will be a Vue component.

- **svgo**: (object, optional) Configuration for SVGO, refer to the [SVGO documentation](https://github.com/svg/svgo) for details.

- **include**: (string | string[], optional) Paths to match SVG files that should be processed. Default is `'**/icons/*.svg'`, following [micromatch](https://github.com/micromatch/micromatch) rules.
