interface AnyData{
  [propName: string]: any
}

export function equal (obj1: AnyData, obj2: AnyData): boolean {
  const o1 = obj1 instanceof Object
  const o2 = obj2 instanceof Object
  if (!o1 || !o2) { // 如果不是对象 直接判断数据是否相等
    return obj1 === obj2
  }
  // 判断对象的可枚举属性组成的数组长度
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
  }
  for (const attr in obj1) {
    const a1 = Object.prototype.toString.call(obj1[attr]) === '[object Object]'
    const a2 = Object.prototype.toString.call(obj2[attr]) === '[object Object]'
    const arr1 = Object.prototype.toString.call(obj1[attr]) === '[object Array]'
    if (a1 && a2) {
      // 如果是对象继续判断
      return equal(obj1[attr], obj2[attr])
    } else if (arr1) {
      // 如果是对象 判断
      if (obj1[attr].toString() !== obj2[attr].toString()) {
        return false
      }
    } else if (obj1[attr] !== obj2[attr]) {
      // 不是对象的就判断数值是否相等
      return false
    }
  }
  return true
}

export function tooltip (msg:string): void {
  const div = document.createElement('div')
  div.className = 'base-tip'
  div.innerHTML = msg
  document.getElementsByTagName('body')[0].appendChild(div)
  setTimeout(() => {
    document.getElementsByTagName('body')[0].removeChild(div)
  }, 3000)
}

interface Browser {
  isAndroid: boolean
  isIOS: boolean
  isMobile: boolean
  isWeixin: boolean
  isQQ: boolean
  isPC: boolean
  isWeibo: boolean
}

export function browserInfo (): Browser {
  const UA = navigator.userAgent
  const isAndroid = /android|adr|linux/gi.test(UA)
  const isIOS = /iphone|mac|ipod|ipad/gi.test(UA) && !isAndroid
  const isBlackBerry = /BlackBerry/i.test(UA)
  const isWindowPhone = /IEMobile/i.test(UA)
  const isMobile = isAndroid || isIOS || isBlackBerry || isWindowPhone
  return {
    isAndroid: isAndroid,
    isIOS: isIOS,
    isMobile: isMobile,
    isWeixin: /MicroMessenger/gi.test(UA),
    isQQ: /QQ/gi.test(UA),
    isPC: !isMobile,
    isWeibo: /WeiBo/gi.test(UA)
  }
}

export const UNIT_NUMBER = (num:number) => {
  if (num >= 10000) {
    return (parseInt((num / 1000) + '') / 10) + 'w'
  } else {
    return num
  }
}
export const getQueryToJson = () => {
  const resultMap = <any>{}

  const queryStr = window.location.href.split('?')[1] ?? ''
  queryStr.split('&').forEach((item:string, index:number) => {
    const [key, value] = item.split('=')
    if (!Array.isArray(resultMap[key])) {
      resultMap[key] = []
    }
    resultMap[key].push(value)
  })

  return resultMap
}
