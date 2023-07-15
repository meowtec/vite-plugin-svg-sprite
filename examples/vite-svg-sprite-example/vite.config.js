// @ts-check

import pluginVue from '@vitejs/plugin-vue';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  plugins: [
    pluginVue(),
    createSvgSpritePlugin({
      include: '**/icons/**/*.svg',
      symbolId: 'icon-[name]-[hash]', // if you need special name: symbolId: 'icon-[name]-[hash]'
    })],
};

export default config;
