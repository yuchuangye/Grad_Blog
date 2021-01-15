/*
*  请求成功 (2xx) 
*  code: 0 | 1
*/
function response(code, msg, data = []) {
    return {
        code,
        msg,
        data
    }
}

module.exports = response