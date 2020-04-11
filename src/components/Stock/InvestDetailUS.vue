<template>
  <div class="stock-invest-detail">
    <div class="echart-stock-invest-detail"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import oBar from './iddataus'
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
      let myBar = echarts.init(document.getElementsByClassName('echart-stock-invest-detail')[0])
      myBar.setOption(this.optionBar)
    })
    window.onresize = () => {
      let myBar = echarts.init(document.getElementsByClassName('echart-stock-invest-detail')[0])
      myBar.resize()
    }
  }
}
</script>

<style scoped lang="less">
  .stock-invest-detail {
    height: 100%;
    width: 100%;
    .echart-stock-invest-detail {
      height: 100%;
      width: 100%;
    }
  }
</style>
