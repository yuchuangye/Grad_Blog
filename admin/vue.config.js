module.exports = {
	// 开发服务器配置
	devServer: {
		host: 'localhost',
		port: 3002,
		hot: true
	},
	// 关闭 eslint校验
	lintOnSave: false,
	// 如果不需要生产环境的 sourcemap, 设置为 false, 那么打包后就没有.map文件
	productionSourceMap: false,

  // chainWebpack是与 html-webpack-plugin 插件配置相关的选项
  chainWebpack: config => {
    // 改变 htmlWebpackPlugin.options.title 变量的值
    config.plugin('html').tap(options => {
      options[0].title= 'GRADBLOG-ADMIN'
      return options
    })
  }
}
