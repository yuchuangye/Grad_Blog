/*
 * 表单验证规则
*/

export default {
  // 用户名验证规则
  checkUserName(rule, value, callback) {
    if (!value) {
      return callback('请输入用户名')
    } else if (new RegExp('[^a-zA-Z0-9\u4e00-\u9fa5]', 'g').test(value)) {
      return callback('名字只能是数字、字母和中文的组合')
    } else if (value.length > 10) {
      return callback('长度不能大于10个字符')
    } else {
      return callback()
    }
  },
  // 密码验证规则
  checkPassword(rule, value, callback) {
    if (!value) {
      return callback('请输入密码')
    } else if (value.length < 6) {
      return callback('密码长度不能小于6个字符')
    } else {
      return callback()
    }
  },
  // 密保验证规则
  checkSecure(rule, value, callback) {
    if (!value.question) {
      return callback('请选择密保问题')
    } else if (!value.answer) {
      return callback('必须填写密保答案')
    } else if (new RegExp('[^a-zA-Z0-9\u4e00-\u9fa5]', 'g').test(value.answer)) {
      return callback('密保答案只能是数字、字母和中文的组合')
    } else {
      return callback()
    }
  }
}
