const option = {
  title: {
    text: 'Revenue-Datail-US',
    subtext: '营收-明细-US',
    sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function (params) {
      switch (params[0].dataIndex) {
        case 0:
          return `buy 美国银行 100股<br>${params[0].data}`
        case 1:
          return `sell 美国银行 100股<br>${params[0].data}`
        case 2:
          return `buy 纳指反向ETF 100股<br>${params[0].data}`
        case 3:
          return `sell 纳指反向ETF 100股<br>${params[0].data}`
        case 4:
          return `buy 可口可乐 50股<br>${params[0].data}`
        case 5:
          return `buy 标普500三倍做空ETF 100股<br>${params[0].data}`
        case 6:
          return `sell 标普500三倍做空ETF 100股<br>${params[0].data}`
        case 7:
          return `buy 美国原油ETF 71股<br>${params[0].data}`
        case 8:
          return `sell 美国原油ETF 71股<br>${params[0].data}`
        case 9:
          return `buy 三倍做多标普500ETF 15股<br>${params[0].data}`
        case 10:
          return `sell 三倍做多标普500ETF 15股<br>${params[0].data}`
        case 11:
          return `buy 三倍做多标普500ETF 13股<br>${params[0].data}`
        case 12:
          return `sell 三倍做多标普500ETF 13股<br>${params[0].data}`
        case 13:
          return `buy RTX CALL 1手<br>${params[0].data}`
      }
    }
  },
  legend: {
    data: ['invest', 'earning']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    splitLine: { show: false },
    data: ['2020.03.24 21', '2020.03.28 07', '2020.03.30 16', '2020.03.30 22', '2020.03.30 22', '2020.04.03 18', '2020.04.04 03', '2020.04.06 16', '2020.04.06 16', '2020.04.06 16',
      '2020.04.07 07', '2020.04.07 16', '2020.04.08 02', '2020.04.09 21']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'balance',
      type: 'line',
      stack: '总量',
      itemStyle: {
        color: 'blue'
      },
      data: [-1912.98, 235.02, -2408.96, 134.06, -2087.92, -4720.9, -2074.88, -2488.24, -2087.23, -2498.36, -2064.69, -2479.77, -2079.62, -2237.7]
    },
    {
      name: 'earning',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'top'
      },
      data: ['-', 2148, '-', 2543.02, '-', '-', 2646.02, '-', 401.01, '-', 433.67, '-', 400.15, '-']
    },
    {
      name: 'invest',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'bottom',
        formatter: (param) => {
          return param.data * (-1)
        }
      },
      data: [-1912.98, '-', -2643.98, '-', -2221.98, -2632.98, '-', -413.36, '-', -411.13, '-', -415.08, '-', -158.08]
    }
  ]
}
export default option
