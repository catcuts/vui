////////////////////////////////////////////////////////////////
// 1.  [Node.js 中 require() 如何解析模块](http://nodejs.cn/api/modules.html#modules_file_modules)
// 2.  [为什么要用 copy-webpack-plugin ？]()见同名印象笔记  
// 3.  [Node.js 全局变量 __dirname 和 __fielname](http://nodejs.cn/api/globals.html#globals_dirname)
// 4.  [Node.js Path模块](http://javascript.ruanyifeng.com/nodejs/path.html)
// 5.  [如何使用 html-webpack-plugin](http://www.jianshu.com/p/c0e1fc31940b)
// 6.  [如何使用 extract-text-webpack-plugin](http://www.css88.com/doc/webpack2/plugins/extract-text-webpack-plugin/)
////////////////////////////////////////////////////////////////
var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config') // 加载 ../config/index.js 模块（见 1 ）
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin') // 用于复制 ../static/ 资源到 output_path / static/ 中（见 2 ）
var HtmlWebpackPlugin = require('html-webpack-plugin') // 用于自动生成入口 html 文件
var ExtractTextPlugin = require('extract-text-webpack-plugin') // 用于提取组件中的 CSS 到一个文件
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') // 用于压缩提取的 CSS

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  ////////////////////////////////////////////////////////////////////////////////
  // 插件处理总览                                                                
  // 1.  定义 变量                                                              
  // 2.  压缩 JS                                                                
  // 3.  提取 CSS                                                               
  // 4.  压缩 CSS                                                               
  // 5.  生成 HTML                                                              
  // 6.  提取 公共依赖 vendor 以及 runtime 代码                                  
  // 7.  复制 静态资源 到 可用位置                                               
  // 8.  压缩 代码（ 上述步骤处理后的 JS 和 CSS ，使用 gzip 或其他算法 ）（可选）                                                   //
  // 9.  分析 打包（可选）                                                      
  ///////////////////////////////////////////////////////////////////////////////
  plugins: [
    //////// plugins - 1 ////////
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env // 定义 Node.js 全局变量 env 为 env 的值，可以像使用 __dirname 来使用 env
    }),

    //////// plugins - 2 ////////
    // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
    new webpack.optimize.UglifyJsPlugin({
      compress: { // http://lisperator.net/uglifyjs/compress
        warnings: false
      },
      sourceMap: true
    }),

    //////// plugins - 3 /////////
    // extract css into its own file
    // https://github.com/webpack-contrib/extract-text-webpack-plugin
    new ExtractTextPlugin({ // 见 6
      filename: utils.assetsPath('css/[name].[contenthash].css') // output_path/static/css/[n].[h].css
      // 注意：在本项目设置中，只提取了 vue 组件中的 CSS 到上述文件名的文件中
      //      这在 ./webpack.base.conf.js 可以看到，它设置了 webpack 对 vue 组件采用的 loader 是 vue-loader ，
      //      option 是 vueLoaderConfig ，其中调用了 utils.cssLoaders 并传入参数 extract
      //      如果 extract 为 true （ isProduction ）则对每个 css 加载器都启用该插件 ExtractTextPlugin 进行 CSS 提取
    }),

    //////// plugins - 4 /////////
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // https://www.npmjs.com/package/optimize-css-assets-webpack-plugin
    new OptimizeCSSPlugin({ // 压缩提取出来的 CSS ，因为提取出来的可能有重复的样式声明
      cssProcessorOptions: {
        safe: true // 安全模式？找不到任何文档支持
      }
    }),

    //////// plugins - 5 /////////
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({ // 见 5
        // 文件名
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html' // 也是 ..dist/index.html ，但可以改成其他的如 text.html
        : config.build.index, // ..dist/index.html
      template: 'index.html', // 模板
      inject: true, // 所有的 javascript 资源将被放置到 body 元素的底部
      minify: { // 压缩选项
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 移除空白符和换行符
        removeAttributeQuotes: true // 移除属性的符号（ class="example" -> class=example ）
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
        // using example:
        // http://www.jianshu.com/p/c0e1fc31940b
        // http://m.blog.csdn.net/keliyxyz/article/details/51513114http://m.blog.csdn.net/keliyxyz/article/details/51513114
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency' // 在 chunk 被插入到 html 之前，控制它们的排序
    }),

    //////// plugins - 6 /////////
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),

    //////// plugins - 7 /////////
    // copy custom static assets
    new CopyWebpackPlugin([ // 参见 2
      {
        from: path.resolve(__dirname, '../static'), // 从 ../static/ 提取资源（ __dirname 是本 .js 模块的绝对路径，见 3 ）
                                                    // 注意 path.resolve 返回的是绝对路径，因此跟 output_path 无关，见 4
        to: config.build.assetsSubDirectory, // 复制到 output_path/static/ 目录下（ output_path 定义在上面 webpackConfig.output.path ） 
        ignore: ['.*'] // 忽略匹配 .* 的某些文件（看样子好像忽略了全部？）
        // more options:
        // https://github.com/kevlened/copy-webpack-plugin
        // using example:
        // http://hao.jser.com/archive/10815/#copy-webpack-plugin
      }
    ])
  ]
})

    //////// plugins - 8 /////////
if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    // http://www.css88.com/doc/webpack2/plugins/compression-webpack-plugin/
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]', // 压缩后资源名称
      algorithm: 'gzip', // 使用 gzip 算法压缩
      test: new RegExp( // 资源名匹配表达式
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240, // 只有大小大于该值的资源会被处理，单位是 bytes
      minRatio: 0.8 // 只有压缩率小于这个值的资源才会被处理
    })
  )
}

if (config.build.bundleAnalyzerReport) { // 打包分析
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
