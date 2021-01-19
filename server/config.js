/*
*  配置文件 
*/
module.exports = {
	// token密钥
	secert: 'grad-blog-20210917-api',
	// 数据库信息
	dbInfo: {
		name: 'grad_blog',
		username: 'yuchaungye',
		passwrod: 'gradblog2019',
		connectStr: `mongodb://${this.dbInfo.username}:${this.dbInfo.passwrod}
		@localhost:27017/${this.dbInfo.name}`
	},
	// 项目运行端口号
	port: 3009
}