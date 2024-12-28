import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,

  {
    ignores: ['**/cjs', '**/esm', 'examples'],
  },
  // 通用规则
);
