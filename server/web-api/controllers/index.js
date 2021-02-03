const user = require('./user.js')
const tag = require('./tag.js')
const upload = require('../../middlewares/upload.js')

module.exports =  {
	...user,
	...tag,
	upload
}