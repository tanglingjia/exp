<template>
  <div class="stock-income-outcome">
    <div class="echart-stock-income-outcome"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import oBar from './iodata'
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
      let myBar = echarts.init(document.getElementsByClassName('echart-stock-income-outcome')[0])
      myBar.setOption(this.optionBar)
    })
    window.onresize = () => {
      let myBar = echarts.init(document.getElementsByClassName('echart-stock-income-outcome')[0])
      myBar.resize()
    }
  }
}
</script>

<style scoped lang="less">
  .stock-income-outcome{
    height: 100%;
    width: 100%;
    .echart-stock-income-outcome {
      height: 100%;
      width: 100%;
    }
  }
</style>
