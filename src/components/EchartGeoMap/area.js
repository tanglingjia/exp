import {formatData} from '@/utils'

const option = {
  tooltip: {
    show: true,
    formatter: function (params) {
      if (params.data) {
        return params.name + '：' + formatData(params.data['value'])
      }
    }
  },
  visualMap: {
    type: 'continuous',
    orient: 'horizontal',
    itemWidth: 10,
    itemHeight: 80,
    text: ['高', '低'],
    showLabel: true,
    seriesIndex: [0],
    min: 0,
    max: 40,
    inRange: {
      color: ['#CFE6FE', '#60ACFC']
      // color: ['#FFFFFF', '#000000']
      // color: ['#121122', 'rgba(3,4,5,0.4)'],
      // symbolSize: [30, 100]
    },
    outOfRange: {
      color: ['#000000', '#000000']
    },
    textStyle: {
      color: '#7B93A7'
    },
    bottom: '10%',
    left: '15%'
  },
  xAxis: {
    show: false
  },
  yAxis: {
    show: false
  },
  geo: {
    map: 'china',
    label: {
      emphasis: {
        show: false
      }
    },
    itemStyle: {
      emphasis: {
        areaColor: '#fff464'
      }
    },
    regions: []
  },
  series: [
    {
      name: 'mapSer',
      type: 'map',
      roam: false,
      geoIndex: 0,
      label: {
        show: false
      }
    }
  ]
}

export default option
