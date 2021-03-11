const user = require('./user')
const tag = require('./tag')
const upload = require('../../middlewares/upload')

module.exports =  {
	...user,
	...tag,
	upload
}