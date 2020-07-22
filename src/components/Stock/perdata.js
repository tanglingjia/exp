const xAxisData = ['HK-03690', 'US-NIO', 'US-BILI', 'US-PDD']
const data1 = [
  {
    num: 400,
    start: 199,
    end: 199,
    itemStyle: {
      opacity: 0.5
    },
    detail: [
      {
        start: 199,
        end: 199
      }
    ]
  },
  {
    num: 2573,
    start: 12.98,
    end: 12.98,
    itemStyle: {
      opacity: 0.5
    },
    detail: [
      {
        start: 12.98,
        end: 12.98
      }
    ]
  },
  {
    num: 170,
    start: 44.49,
    end: 44.49,
    itemStyle: {
      opacity: 0.5
    },
    detail: [
      {
        start: 44.49,
        end: 44.49
      }
    ]
  },
  {
    num: 80,
    start: 82.7,
    end: 82.7,
    itemStyle: {
      opacity: 0.5
    },
    detail: [
      {
        start: 82.7,
        end: 82.7
      }
    ]
  }
]
let option = {
  backgroundColor: '#eee',
  legend: {
    data: ['1']
  },
  tooltip: {
    formatter: (param) => {
      console.log(param)
      let text = `${param.marker}${param.name}: ${param.data.start}-${param.data.end} ${param.data.value} ${((param.data.end - param.data.start) * 100 / param.data.start).toFixed(2)}%<br>`
      if (param.data.detail.length) {
        let index = 1
        param.data.detail.forEach(d => {
          text += `q${index}: ${d.start}-${d.end} ${d.value} ${((d.end - d.start) * 100 / d.start).toFixed(2)}%<br>`
          index++
        })
      }
      return text
    }
  },
  xAxis: {
    data: xAxisData,
    name: 'X Axis',
    axisLine: {onZero: true},
    splitLine: {show: false},
    splitArea: {show: false}
  },
  yAxis: {
    splitArea: {show: false}
  },
  grid: {
    left: 100
  },
  series: [
    {
      name: '1',
      type: 'bar',
      stack: 'one',
      data: data1
    }
  ]
}
export default option
