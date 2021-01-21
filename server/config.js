/*
*  配置文件 
*/
module.exports = {
	// token密钥
	secret: 'grad-blog-20210917-api',
	// 数据库信息
	dbInfo: {
		name: 'grad_blog',
		username: 'yuchaungye',
		passwrod: 'gradblog2019',
		connectStr: `mongodb://${this.username}:${this.passwrod}@localhost:27017/${this.name}`
	},
	// ip地址
	ip:　'localhost',
	// 项目运行端口号
	port: 3009,
	// 完整域名
	domain: `http://${this.ip}:${this.port}`
	
}