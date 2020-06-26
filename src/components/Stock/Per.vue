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
      optionBar: oBar
    }
  },
  methods: {
  },
  mounted () {
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
