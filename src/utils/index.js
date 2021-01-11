// 小数千分符
const formatData = (num) => {
  num += ''
  if (!num.includes('.')) num += '.'
  return num.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
    return $1 + ','
  }).replace(/\.$/, '')
}
// 如果小数.000或.50这种形式裁掉最后的0
const cutNum = (num) => {
  if (num.indexOf('.') > 0) {
    while (num.lastIndexOf('0') === (num.length - 1)) {
      num = num.substring(0, num.length - 1)
    }
  }
  if (num.indexOf('.') === (num.length - 1)) {
    num = num.substring(0, num.length - 1)
  }
  return num
}

export {
  formatData, cutNum
}
