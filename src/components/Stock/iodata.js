const myData = [
  {
    date: '2020-08-02',
    invest: 354861.69,
    earning: 404259.1
  }
]
let dateAry = []
let investAry = []
let earningAry = []
let balanceAry = []
let sumInvest = 0
myData.forEach(d => {
  dateAry.push(d.date)
  sumInvest += d.invest
  investAry.push(sumInvest.toFixed(2))
  earningAry.push(d.earning.toFixed(2))
  balanceAry.push((d.earning - sumInvest).toFixed(2))
})

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
    data: ['invest', 'earning', 'balance']
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
    data: dateAry
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'earning',
      type: 'line',
      label: {
        show: true
      },
      data: earningAry
    },
    {
      name: 'invest',
      type: 'line',
      label: {
        show: true
      },
      data: investAry
    },
    {
      name: 'balance',
      type: 'line',
      label: {
        show: true
      },
      data: balanceAry
    }
  ]
}
export default option
