import pluginReact from '@vitejs/plugin-react';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  plugins: [
    pluginReact(),
    createSvgSpritePlugin({
      include: '**/icons/**/*.svg',
      exportType: 'react',
      symbolId: 'icon-[name]-[hash]',
    })],
};

export default config;
