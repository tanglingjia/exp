const xAxisData = ['HK-03690', 'US-NIO', 'US-BILI', 'US-PDD']
const data1 = [
  {
    num: 400,
    start: 174.294,
    end: 174.294,
    itemStyle: {
      opacity: 0.5
    },
    detail: [
      {
        start: 174.294,
        end: 174.294
      }
    ]
  },
  {
    num: 2573,
    start: 11.06,
    end: 11.06,
    itemStyle: {
      opacity: 0.5
    },
    detail: [
      {
        start: 11.06,
        end: 11.06
      }
    ]
  },
  {
    num: 170,
    start: 39.48,
    end: 39.48,
    itemStyle: {
      opacity: 0.5
    },
    detail: [
      {
        start: 39.48,
        end: 39.48
      }
    ]
  },
  {
    num: 80,
    start: 80.66,
    end: 80.66,
    itemStyle: {
      opacity: 0.5
    },
    detail: [
      {
        start: 80.66,
        end: 80.66
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
          text += `m${index}: ${d.start}-${d.end} ${d.value} ${((d.end - d.start) * 100 / d.start).toFixed(2)}%<br>`
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
