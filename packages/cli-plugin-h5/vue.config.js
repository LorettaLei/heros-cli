// eslint-disable-next-line @typescript-eslint/no-var-requires
const px2rem = require('postcss-pxtorem')

module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      '': {
        target: 'http://127.0.0.1:8080/', // 接口
        // secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [px2rem({
          rootValue: 32,
          propList: ['*'],
          exclude: /node_modules/i
        })]
      }
    }
  },
  configureWebpack: config => {
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          vconsole: {
            name: 'vconsole',
            test: /[\\/]node_modules[\\/]vconsole[\\/]/,
            priority: 20
          }
        }
      }
    }
  },
  productionSourceMap: process.env.NODE_ENV === 'development'
}
