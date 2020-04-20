const option = {
  title: {
    text: 'Invest Percent',
    subtext: '投资比重',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },
  legend: {
    bottom: 10,
    left: 'center',
    data: ['腾讯', '亚马逊', '美团', '谷歌']
  },
  series: [
    {
      type: 'pie',
      radius: '65%',
      center: ['50%', '50%'],
      selectedMode: 'single',
      data: [
        {value: 4851, name: '腾讯'},
        {value: 2439.68, name: '亚马逊'},
        {value: 2350.85, name: '美团'},
        {value: 1272.7, name: '谷歌'}
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
export default option
