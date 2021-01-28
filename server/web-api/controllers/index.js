const user = require('./user.js')
const article = require('./article.js')
const upload = require('../../middlewares/upload.js')

module.exports =  {
	...user,
	...article,
	upload
}