'use strict'
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const utils = require('./utils')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')
const PROD_ENV = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.devtool,
  output: {
    path: config.build.assetsRoot, // 目标打包地址
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  // 替代CommonsChunkPlugin
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            drop_console: config.build.dorpConsole,
          }
        }
      }),
      new CssMinimizerPlugin(),
    ],
    removeAvailableModules: true,
    // 删除空chunk
    removeEmptyChunks: true,
    // 合并重复chunk
    mergeDuplicateChunks: true,
    flagIncludedChunks: true,
    usedExports: true, // 确定每个模块下被使用的导出
    concatenateModules: true, // 合并模块
    sideEffects: true, // 开启副作用功能
    innerGraph: true, // 找出导出和引用之间的依赖关系

    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        commons: {
          name: 'chunk-commons',
          test: /[\\/]src[\\/]components[\\/]/,
          priority: 5,
          chunks: 'initial',
          minChunks: 2,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      'process.env': (merge(PROD_ENV, {
        ASSETS_PUBLIC_PATH: `"${config.build.assetsPublicPath}"`
      }))
    }),
    new CleanWebpackPlugin(),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // extract css into its own file
    new MiniCssExtractPlugin({
      ignoreOrder: true, // css加载顺序
      filename: utils.assetsPath('css/[name].[contenthash:5].css'),
      chunkFilename: utils.assetsPath('css/[id].[contenthash:5].css'),
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      favicon: config.build.faviconPath,
      minify: {
        removeComments: true, // 删除注释
        collapseWhitespace: true, // 删除空格
        removeAttributeQuotes: true
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunksSortMode: 'auto'
    }),
  ],
})

if (config.build.productionGzip) {
  const CompressionPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      deleteOriginalAssets: config.build.deleteOriginalAssets,
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

// module.exports = smp.wrap(webpackConfig)
module.exports = webpackConfig
