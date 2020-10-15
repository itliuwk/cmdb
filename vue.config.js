const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const Process = process.env
const defaultSetting = {
  outputDir: 'dist',
  title: '数据资产管控平台CMDB',
  faviconPath: 'http://clink.asuscomm.com:19380/logo.png',

  // 后台api接口地址，已用代理  所以是 localhost  打包时  运行对应的 build环境即可
  requestServer: 'http://localhost:3000/shccs-boot'
}

// vue.config.js
module.exports = {
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463
   */
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,

  outputDir: Process.VUE_APP_PROJECT_DIR || defaultSetting.outputDir,

  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: Process.VUE_APP_PROJECT_TITLE || defaultSetting.title,

      faviconPath: Process.VUE_APP_PROJECT_ICO || defaultSetting.faviconPath,
      requestServer: Process.VUE_APP_REQUEST_SERVER || defaultSetting.requestServer
    }

  },

  // 打包app时放开该配置
  // publicPath:'./',
  configureWebpack: config => {
    // 生产环境取消 console.log
    if (Process.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))
      .set('@mobile', resolve('src/modules/mobile'))

    // 生产环境，开启js\css压缩
    if (Process.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(new CompressionPlugin({
        test: /\.js$|.\css|.less/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false // 不删除源文件
      }))
    }

    // 配置 webpack 识别 markdown 为普通的文件
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use()
      .loader('file-loader')
      .end()
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          'primary-color': '#2D303B',
          'link-color': '#2D303B',
          'border-radius-base': '4px'
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    port: 3000,
    proxy: {
      '/shccs-boot': {
        target: 'http://192.168.50.147:10002', // 请求本地 需要shccs-boot后台项目
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/shccs-boot': ''  //默认所有请求都加了shccs-boot前缀，需要去掉
        }
      }
    }
  },

  lintOnSave: undefined
}
