/* 异常/错误 响应数据格式化
*  401 403 404 422 500  
*/
function formatError(err) {
    return {
        code: 10,
        status: err.status || err.statusCode || 500,
        msg: err.message
    }
}

module.exports = formatError