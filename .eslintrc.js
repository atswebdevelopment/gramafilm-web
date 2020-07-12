module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-new': 'off',
    'nuxt/no-globals-in-created': 'off',
    'vue/no-v-html': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
