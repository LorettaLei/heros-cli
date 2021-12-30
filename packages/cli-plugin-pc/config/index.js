'use strict'

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
    },

    // Various Dev Server settings
    host: 'local-ipv6', // 'local-ip'/'local-ipv4'/'local-ipv6'
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // autoOpenBrowser: true,
    autoOpenBrowser: false, // 'chrome',
    errorOverlay: true,
    notifyOnErrors: true,

    /**
     * Source Maps
     */

    // https://webpack.docschina.org/configuration/devtool/#root
    devtool: 'eval-cheap-module-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    faviconPath: 'src/assets/ico/logo.ico',

    /**
     * Source Maps
     */

    // https://webpack.docschina.org/configuration/devtool/#root
    devtool: 'source-map', // 'none'

    // gzip: npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    deleteOriginalAssets: false,
    productionGzipExtensions: ['js', 'ts', 'css'],

    // `npm run build --report`
    // http://localhost:8888
    bundleAnalyzerReport: process.env.npm_config_report,

    dorpConsole: true
  }
}
