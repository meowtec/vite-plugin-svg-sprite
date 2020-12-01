import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  plugins: [createSvgSpritePlugin({
    include: '**/icons/*.svg',
    symbolId: 'icon-[name]-[hash]',
  })],
};

export default config;
