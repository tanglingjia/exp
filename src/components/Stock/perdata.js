const xAxisData = ['HK03690']
const data = [
  {
    value: 3670,
    start: 138,
    end: 174.7,
    itemStyle: {
      opacity: 0.5
    },
    detail: [
      {
        value: 3670,
        start: 138,
        end: 174.7
      }
    ]
  }]
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
