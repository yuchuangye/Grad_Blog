const path = require('path')

// 拼接绝对路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
	// 开发服务器配置
	devServer: {
		host: 'localhost',
		port: 3001,
		hot: true
	},
	// 只在开发模式下启用eslint, 默认值是 true
	lintOnSave: process.env.NODE_ENV === 'development',
	// 如果不需要生产环境的 sourcemap, 设置为 false, 那么打包后就没有.map文件
	productionSourceMap: false,

  // chainWebpack是与 html-webpack-plugin 插件配置相关的选项
  chainWebpack: config => {
    // 改变 htmlWebpackPlugin.options.title 变量的值
    config.plugin('html').tap(options => {
      options[0].title= 'GRADBLOG'
      return options
    })

    // 设置路径别名 set(别名, 对应路径)
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('components', resolve('./src/components'))
      .set('styles', resolve('./src/styles'))
      .set('utils', resolve('./src/utils'))
  },
 
	// 全局导入sass文件, 这样就不用在每个组件中再导入
	css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/_variable.scss";
          @import "@/styles/_mixins.scss";
        `
      }
    }
  }
}