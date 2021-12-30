'use strict'

const webpack = require('webpack')
const {merge} = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const baseWebpackConfig = require('./webpack.base.conf.js')
const config = require('../config/index.js')
const utils = require('./utils.js')
const DEV_ENV = require('../config/dev.env.js')
// tool
const { addressTool } = require('../build/tool/system.js')

const HOST = process.env.HOST
const IPV4 = addressTool.getLocalIP()
const PORT = process.env.PORT && Number(process.env.PORT)
// const rules = utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true });

const devWebpackConfig = merge(baseWebpackConfig, {
  target: 'web',
  mode: 'development',
  cache: {
    type: 'filesystem',
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true }),
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  infrastructureLogging: {
    // appendOnly: true,
    // level: 'none',
  },
  stats:'errors-only',
  // these devServer options should be customized in /config/index.js
  devServer: {
    host: HOST || config.dev.host,
    devMiddleware: {
      publicPath: config.dev.assetsPublicPath,
    },
    client: {
      logging: "warn",
      overlay: config.dev.errorOverlay
        ? { warnings: false, errors: true }
        : false,
      progress: true,
    },
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    allowedHosts: 'all',
    static: {
      watch: {
        ignored: /node_modules/,
        usePolling: true,
      },
    },

    // contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,

    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,

    proxy: config.dev.proxyTable,
  },
  optimization: {
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
      'process.env': (merge(DEV_ENV, {
        ASSETS_PUBLIC_PATH: `"${config.dev.assetsPublicPath}"`
      }))
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: config.build.faviconPath,
      inject: true,
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsWebpackPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [
            'web server url:',
            `http://${IPV4}:${port}`,
            `http://localhost:${port}`,
          ],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
