const option = {
  title: {
    text: 'Revenue-Datail-HK',
    subtext: '营收-明细-HK',
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
          return `buy 美团 100股<br>${params[0].data}`
        case 1:
          return `buy 腾讯 100股<br>${params[0].data}`
        case 2:
          return `buy 龙湖 500股<br>${params[0].data}`
        case 3:
          return `buy FGX原油 1500股<br>${params[0].data}`
        case 4:
          return `sell FGX原油 1500股<br>${params[0].data}`
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
    data: ['2020.03.23 14', '2020.03.25 10', '2020.03.25 11', '2020.04.06 09', '2020.04.06 15']
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
      data: [-8364.6, -46013.9, -63705.9, -66766.78, -63557.72]
    },
    {
      name: 'earning',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'top'
      },
      data: ['-', '-', '-', '-', 3209.06]
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
      data: [-8364.6, -37649.3, -17692, -3060.88, '-']
    }
  ]
}
export default option
