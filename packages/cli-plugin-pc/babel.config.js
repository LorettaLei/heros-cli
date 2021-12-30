module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: {
          version: 3,
          proposals: true
        },
        targets: {
          esmodules: true,
        },
      },
    ],
    [
      '@babel/preset-typescript',
      {
        allExtensions: true,
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime'],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
  ],
}
