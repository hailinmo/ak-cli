const eslintJson = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, semi: false }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
}

const commonEslintPlugins = {
  eslint: '^7.25.0', // 主程序
  prettier: '^2.2.1', // 主程序
  'eslint-config-prettier': '^8.3.0', // 解决eslint与prittier之间的冲突
  'eslint-plugin-prettier': '^3.4.0', // prittier格式化插件
}

const babelPlugins = {
  '@babel/core': '^7.14.0', // babel解析器需要
  '@babel/eslint-parser': '^7.14.0', // babel解析器
}

const tsPlugins = {
  '@typescript-eslint/eslint-plugin': '^4.22.1', // 支持ts检查
  '@typescript-eslint/parser': '^4.22.1', // ts语法解析器
}

const reactPlugins = {
  'eslint-plugin-react': '^7.23.2', // 支持react检查，React 对 ESLint 无法识别的JSX语法应用特定的语义
}

const vuePlugins = {
  'eslint-plugin-vue': 'v7.10.0', // 支持vue检查
}

module.exports = {
  eslintJson,
  commonEslintPlugins,
  tsPlugins,
  vuePlugins,
  reactPlugins,
  babelPlugins,
}
