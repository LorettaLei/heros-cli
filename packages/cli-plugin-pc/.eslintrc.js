module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    extraFileExtensions: [ '.vue' ],
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'vue/no-multiple-template-root': 'off', // 不适用vue3
    'vue/no-v-model-argument': 'off', // 不适用vue3
    'vue/no-v-for-template-key': 'off', // 不适用当前版本
    'no-debugger': 'warn',
    'no-fallthrough': 'off', // case前可以没有break
    'comma-dangle': [2,'always-multiline'], // 对象或数组多行写法时，最后一个值加逗号
  }
}
