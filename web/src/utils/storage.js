/*
 *  封装 localStorage api
*/

export default {
  // 设置数据
  setItem(key, value) {
    if (typeof value === 'string') {
      localStorage.setItem(key, value)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },
  // 获取数据
  getItem(key) {
    const value = localStorage.getItem(key)
    if (value === null) {
      return ''
    } else if (['[', ']', '{', '}'].includes(value)) {
      // 普通字符串
      return value
    } else {
      // 数组 或 对象
      return JSON.parse(value || '{}')
    }
  },
  // 删除某一项
  removeItem(key) {
    localStorage.removeItem(key)
  },
  // 清空所有
  clear() {
    localStorage.clear()
  }
}
