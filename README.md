# vite-plugin-svg-sprite

SVG sprite plugin for [Vite](https://github.com/vitejs/vite)

## install
```
npm i vite-plugin-svg-sprite -D
```

## Usage

Add the plugin to your `vite.config.js`:

```javascript
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

const config = {
  plugins: [
    createSvgSpritePlugin({
      symbolId: 'icon-[name]-[hash]',
    }),
  ],
}
```

Then use it like that in your app code:

```jsx
import appIconId from './path/to/icons/app.svg';

// react or vue component, as you want
export default function App() {
  return (
    <svg>
      <use
        xlinkHref={`#${appIconId}`}
      />
    </svg>
  );
}
```

You can also access the `width`/`height` attributes of the SVG with the `size` export:

```jsx 
import appIconId, { size } from './path/to/icons/app.svg';

// react or vue component, as you want
export default function App() {
  return (
    <svg {...size}>
      <use
        xlinkHref={`#${appIconId}`}
      />
    </svg>
  );
}
```

If you're using TypeScript, add the following line to your `vite-env.d.ts`:
```diff
/// <reference types="vite/client" />
+ /// <reference types="vite-plugin-svg-sprite/client" />
```

## options

```javascript
const plugin = createSvgSpritePlugin(options);
```

### `options.symbolId: string`

For generating the `id` attribute of `<symbol>` element. Defaults to `[name]`

### `options.include: string | string[]`

Match files that will be transformed. Defaults to `'**.svg'`. See [micromatch](https://github.com/micromatch/micromatch) for the syntax document.

### `options.svgo: boolean | SvgoOptions`

Enable [SVGO](https://github.com/svg/svgo) for optimizing SVG. Defaults to `true`.
