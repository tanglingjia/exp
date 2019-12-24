// 小数千分符
const formatData = (num) => {
  num += ''
  if (!num.includes('.')) num += '.'
  return num.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
    return $1 + ','
  }).replace(/\.$/, '')
}

export {
  formatData
}
