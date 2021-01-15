
/**
 * extend([deep], target, ...source)
 * @param {type} deep
 * @param {type} target
 * @param {type} ...source
 * @returns {unresolved}
 */

const extend = function() { // from jquery2
  // 辅助函数
  var class2type = {}
  var cT = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error']
  cT.forEach(function(v, i, a) {
    class2type['[object ' + v + ']'] = v.toLowerCase()
  })
  var dataType = function(obj) {
    return obj == null ? String(obj) : class2type[{}.toString.call(obj)] || 'object'
  }
  var isArray = Array.isArray ||
        function(object) {
          return object instanceof Array
        }
  var isObject = function(obj) {
    return dataType(obj) === 'object'
  }
  var isPlainObject = function(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype
  }
  var isWindow = function(obj) {
    return obj != null && obj === obj.window
  }
  var isEmptyObject = function(o) {
    for (var p in o) {
      if (p !== undefined) {
        return false
      }
    }
    return true
  }
  var isFunction = function(value) {
    return dataType(value) === 'function'
  }

  // 函数主体开始
  var options; var name; var src; var copy; var copyIsArray; var clone
  var target = arguments[0] || {}
  var i = 1
  var length = arguments.length
  var deep = false

  if (typeof target === 'boolean') {
    deep = target

    target = arguments[i] || {}
    i++
  }

  if (typeof target !== 'object' && !isFunction(target)) {
    target = {}
  }

  if (i === length) {
    target = this
    i--
  }

  for (; i < length; i++) {
    if ((options = arguments[i]) != null) {
      for (name in options) {
        src = target[name]
        copy = options[name]

        if (target === copy) {
          continue
        }

        if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && isArray(src) ? src : []
          } else {
            clone = src && isPlainObject(src) ? src : {}
          }

          target[name] = extend(deep, clone, copy)
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  return target
}

export default {
  extend
}
