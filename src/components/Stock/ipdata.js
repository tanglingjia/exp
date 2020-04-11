const option = {
  title: {
    text: 'Invest Percent',
    subtext: '投资比重',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    bottom: 10,
    left: 'center',
    data: ['腾讯', '龙湖', '可口可乐', '美团', 'stock5', 'stock6', '灵活']
  },
  series: [
    {
      type: 'pie',
      radius: '65%',
      center: ['50%', '50%'],
      selectedMode: 'single',
      data: [
        {value: 4851, name: '腾讯'},
        {value: 2279.37, name: '龙湖'},
        {value: 2221.98, name: '可口可乐'},
        {value: 1077.43, name: '美团'},
        {value: 0, name: 'stock5'},
        {value: 0, name: 'stock6'},
        {value: 158.08, name: '灵活'}
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
