const xAxisData = ['HK-03690', 'US-WFC', 'US-DAL', 'US-CCL', 'US-SPCE', 'US-NIO', 'US-DIS']
const data = [
  {
    num: 100,
    start: 138,
    end: 174.7,
    itemStyle: {
      opacity: 0.5
    },
    detail: [
      {
        start: 138,
        end: 174.7
      }
    ]
  },
  {
    num: 50,
    start: 28.2,
    end: 25.4,
    itemStyle: {
      opacity: 0.5
    },
    detail: [
      {
        start: 28.2,
        end: 25.4
      }
    ]
  },
  {
    num: 50,
    start: 26.98,
    end: 26.51,
    itemStyle: {
      opacity: 0.5
    },
    detail: [
      {
        start: 26.98,
        end: 26.51
      }
    ]
  },
  {
    num: 80,
    start: 18,
    end: 15.53,
    itemStyle: {
      opacity: 0.5
    },
    detail: [
      {
        start: 18,
        end: 15.53
      }
    ]
  },
  {
    num: 150,
    start: 18,
    end: 16.7,
    itemStyle: {
      opacity: 0.5
    },
    detail: [
      {
        start: 18,
        end: 16.7
      }
    ]
  },
  {
    num: 500,
    start: 6,
    end: 9.67,
    itemStyle: {
      opacity: 0.5
    },
    detail: [
      {
        start: 6,
        end: 9.67
      }
    ]
  },
  {
    num: 28,
    start: 124,
    end: 112.25,
    itemStyle: {
      opacity: 0.5
    },
    detail: [
      {
        start: 124,
        end: 112.25
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
      data: data
    }
  ]
}
export default option
