<template>
  <div class="stock-rookie">
    <div class="echart-stock-rookie"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import oLine from './rookiedata'
export default {
  data () {
    return {
      optionLine: oLine
    }
  },
  methods: {
  },
  mounted () {
    this.$nextTick(() => {
      let myLine = echarts.init(document.getElementsByClassName('echart-stock-rookie')[0])
      myLine.setOption(this.optionLine)
    })
    window.onresize = () => {
      let myLine = echarts.init(document.getElementsByClassName('echart-stock-rookie')[0])
      myLine.resize()
    }
  }
}
</script>

<style scoped lang="less">
  .stock-rookie{
    height: 100%;
    width: 100%;
    .echart-stock-rookie {
      height: 100%;
      width: 100%;
    }
  }
</style>
