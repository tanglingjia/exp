<template>
  <div class="stock-invest-percent">
    <div class="echart-stock-invest-percent"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import oPie from './ipdata'
export default {
  data () {
    return {
      optionBar: oPie
    }
  },
  methods: {
  },
  mounted () {
    this.$nextTick(() => {
      let myPie = echarts.init(document.getElementsByClassName('echart-stock-invest-percent')[0])
      myPie.setOption(this.optionBar)
    })
    window.onresize = () => {
      let myPie = echarts.init(document.getElementsByClassName('echart-stock-invest-percent')[0])
      myPie.resize()
    }
  }
}
</script>

<style scoped lang="less">
  .stock-invest-percent {
    height: 100%;
    width: 100%;
    .echart-stock-invest-percent {
      height: 100%;
      width: 100%;
    }
  }
</style>
