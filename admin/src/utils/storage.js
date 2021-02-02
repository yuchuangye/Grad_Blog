/*
 *  封装 localStorage api
*/

export default {
  // 设置数据
  setItem(key, value) {
    if (typeof value !== 'object' || value === null) {
      localStorage.setItem(key, value)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },
  // 获取数据
  getItem(key) {
    const value = localStorage.getItem(key)
    // 读取不存在的 key, 会返回 null, 注意并不是字符串类型的 null哦！
    if (value === null) {
      return ''
    }
    try {
      const data = JSON.parse(value)
      // 没报错证明是 JSON字符串
      return data
    } catch {
      // 解析异常证明是普通字符串
      return value
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
