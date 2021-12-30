'use strict'
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const utils = require('./utils.js')
const config = require('../config/index.js')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ['./src/main.ts']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.ts', '.js', '.mjs', '.vue', '.tsx'], // 查找顺序
    modules: [
      resolve('src'),
      resolve('node_modules'),
    ],
    alias: {
      '@': resolve('src'),
      '@static': resolve('/static'),
    },

  },
  externals: [],
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: [
          path.resolve(__dirname, '../node_modules'),
        ],
        include: path.resolve(__dirname, '../src'),
        use: [
          // {
          //   loader: 'thread-loader',
          //   options: { workers: 3 }
          // },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.mjs$/,
        resolve: {
          fullySpecified: false
        },
        include: /node_modules/,
        type: "javascript/auto"
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset', // 通用模块
        generator: {
          filename: utils.assetsPath('images/[name].[hash:7][ext]')
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset', // 通用模块
        generator: {
          filename: utils.assetsPath('medias/[name].[hash:7][ext]')
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset', // 通用模块
        generator: {
          filename: utils.assetsPath('fonts/[name].[hash:7][ext]')
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: path.resolve(__dirname, '../static'),
            to: utils.assetsPath(''),
            globOptions: {
              ignore: ['.*']
            }
          }
        ]
      }
    ),
  ],
}
