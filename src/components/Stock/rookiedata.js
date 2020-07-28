let option = {
  legend: {},
  xAxis: {
    type: 'category',
    data: ['LI']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    name: '收益',
    data: [0],
    type: 'line'
  }, {
    name: '收支',
    data: [0],
    type: 'line'
  }]
}

export default option
