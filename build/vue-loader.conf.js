var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  })/*, 因为使用了 postcss-loader ，所以不需要这些了。参见： https://github.com/postcss/postcss-loader 
  postcss: [
		require('autoprefixer')({
			browsers: ['last 2 versions']
		})
	]*/
}
