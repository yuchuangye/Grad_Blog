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
		get connectStr() { return `mongodb://localhost:27017/${this.name}` }
	},
	// ip地址
	ip:　'localhost',
	// 项目运行端口号
	port: 3009,
	// 完整域名
	get domain() { return `http://${this.ip}:${this.port}` },
	get s_domain() { return `https://${this.ip}:${this.port}` },
	// 默认头像
	get d_avatar() { return `${this.domain}/d_avatar.png` }
}
