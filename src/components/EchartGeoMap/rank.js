import {formatData} from '@/utils'

const option = {
  grid: {
    top: 0,
    left: 92,
    right: 0,
    bottom: 0
  },
  tooltip: {
    show: true,
    formatter: function (params) {
      return params.name + '：' + formatData(params.data['value'])
    }
  },
  xAxis: {
    show: false
  },
  yAxis: {
    type: 'category',
    inverse: true,
    nameGap: 16,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      interval: 0,
      margin: 80,
      textStyle: {
        color: '#455A74',
        align: 'left',
        fontSize: 12
      }
    }
  },
  series: [{
    name: 'barSer',
    type: 'bar',
    roam: false,
    visualMap: false,
    zlevel: 2,
    barWidth: 10,
    barMinHeight: 10,
    itemStyle: {
      normal: {
        color: function (params) {
          var colorList = [
            '#FFF464',
            '#FF9933',
            {
              colorStops: [
                {
                  offset: 0,
                  color: '#FFD119'
                },
                {
                  offset: 1,
                  color: '#FFAC4C'
                }
              ]
            },
            {
              colorStops: [
                {
                  offset: 0,
                  color: '#00C0FA'
                },
                {
                  offset: 1,
                  color: '#2F95FA'
                }
              ]
            }
          ]
          if (params.data.barH) {
            return colorList[0]
          } else if (params.data.barC) {
            return colorList[1]
          } else if (params.dataIndex < 3) {
            return colorList[2]
          } else {
            return colorList[3]
          }
        },
        barBorderRadius: 15
      }
    },
    emphasis: {
      itemStyle: {
        color: '#FFF464'
      }
    }
  }]
}

export default option
