<template>
  <div class="echart-tooltip">
  </div>
</template>

<script>
import echarts from 'echarts'
import option from './option'
import { formatData } from '@/utils'
export default {
  name: 'echartTooltip',
  data () {
    return {
      optionSankey: option
    }
  },
  computed: {
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      // this.templateTooltip() // 模板tooltip
      // this.customTooltip() // 自定义tooltip
      // this.enrichTooltip() // html tooltip
      this.$nextTick(() => {
        let mySankey = echarts.init(document.getElementsByClassName('echart-tooltip')[0])
        mySankey.setOption(this.optionSankey)
      })
    },
    templateTooltip () {
      this.optionSankey.tooltip.formatter = '{c}'
    },
    customTooltip () {
      this.optionSankey.tooltip.formatter = (param) => { return `${param.name}: ${param.value}` }
      // this.optionSankey.tooltip.formatter = (param) => { return `${param.name}: ${param.value} (${(param.value * 100 / 30000).toFixed(2)}%)` }
    },
    enrichTooltip () {
      this.optionSankey.tooltip.formatter = (param) => {
        if (param.dataType === 'node') {
          const txt = `<div style="width:178px;height:50px;font-size:12px;">
            <div style="height:50px;text-align:center;margin:0 10px 0 10px;">
              <div style="height:25px;line-height:25px;color:#333;">${this.splitMergeName(param.name)}</div>
              <div style="height:25px;line-height:25px;color:green">浏览量：${formatData(param.value)}</div>
            </div>
          <div>`
          return txt
        }
      }
    },
    // 来源去向名称如果分隔出来有.还需要合并合并后面的.
    splitMergeName (name) {
      const splitName = name.split('.')
      if (splitName.length > 2) {
        let nameAry = []
        for (let i = 1; i < splitName.length; i++) {
          nameAry.push(splitName[i])
        }
        return nameAry.join('.')
      } else {
        return splitName[1]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.echart-tooltip {
  height: 100%;
  width: 100%;
}
</style>
