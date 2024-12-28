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
      exportType: 'vue',
      symbolId: 'icon-[name]-[hash]',
    })],
};

export default config;
