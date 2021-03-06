/*
*  配置文件 
*/

module.exports = {
	// token密钥
	webSecret: 'grad-blog-web-20210917-api',
	adminSecret: 'grad-blog-admin-20210630-api',
	// 数据库信息
	dbInfo: {
		name: 'grad_blog',
		username: 'yuchaungye',
		passwrod: 'gradblog2021',
		get connectStr() { return `mongodb://localhost:27017/${this.name}` }
	},
	// 域名
	ip:　'localhost',
	// 项目运行端口号
	port: 3009,
	// 完整域名
	get domain() { return `http://${this.ip}:${this.port}` },
	get s_domain() { return `https://${this.ip}:${this.port}` },
	// 默认头像
	get d_avatar() { return `${this.domain}/d_avatar.png` },
	// 标签默认图标
	get d_tag() { return `${this.domain}/d_tag.png` }
}
