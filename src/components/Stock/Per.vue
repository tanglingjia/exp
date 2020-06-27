<template>
  <div class="stock-per">
    <div class="echart-stock-per"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import oBar from './perdata'
export default {
  data () {
    return {
      optionBar: oBar,
      rate: 0.129 // 港元兑美元汇率
    }
  },
  methods: {
  },
  mounted () {
    this.optionBar.series.forEach(s => {
      for (let i = 0; i < s.data.length; i++) {
        s.data[i].start = this.optionBar.xAxis.data[i].indexOf('HK') === 0 ? parseFloat((s.data[i].start * this.rate).toFixed(2)) : s.data[i].start
        s.data[i].end = this.optionBar.xAxis.data[i].indexOf('HK') === 0 ? parseFloat((s.data[i].end * this.rate).toFixed(2)) : s.data[i].end
        s.data[i].value = parseFloat(((s.data[i].end - s.data[i].start) * s.data[i].num).toFixed(2))
        s.data[i].detail.forEach(dd => {
          dd.start = this.optionBar.xAxis.data[i].indexOf('HK') === 0 ? parseFloat((dd.start * this.rate).toFixed(2)) : dd.start
          dd.end = this.optionBar.xAxis.data[i].indexOf('HK') === 0 ? parseFloat((dd.end * this.rate).toFixed(2)) : dd.end
          dd.value = parseFloat(((dd.end - dd.start) * s.data[i].num).toFixed(2))
        })
      }
    })
    this.$nextTick(() => {
      let myBar = echarts.init(document.getElementsByClassName('echart-stock-per')[0])
      myBar.setOption(this.optionBar)
    })
    window.onresize = () => {
      let myBar = echarts.init(document.getElementsByClassName('echart-stock-per')[0])
      myBar.resize()
    }
  }
}
</script>

<style scoped lang="less">
  .stock-per{
    height: 100%;
    width: 100%;
    .echart-stock-per {
      height: 100%;
      width: 100%;
    }
  }
</style>
