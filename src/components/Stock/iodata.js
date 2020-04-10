const option = {
  title: {
    text: 'Revenue',
    subtext: '营收',
    sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function (params) {
      var tar
      if (params[1].value !== '-') {
        tar = params[1]
      } else {
        tar = params[0]
      }
      return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value
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
    data: ['2020.03.20', '2020.03.24']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'balance',
      type: 'bar',
      stack: '总量',
      itemStyle: {
        barBorderColor: 'rgba(0,0,0,0)',
        color: 'rgba(0,0,0,0)'
      },
      emphasis: {
        itemStyle: {
          barBorderColor: 'rgba(0,0,0,0)',
          color: 'rgba(0,0,0,0)'
        }
      },
      data: [0, -26251.13]
    },
    {
      name: 'earning',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'top'
      },
      data: ['-', '-']
    },
    {
      name: 'invest',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'bottom'
      },
      data: [-26251.13, -50000]
    }
  ]
}
export default option
