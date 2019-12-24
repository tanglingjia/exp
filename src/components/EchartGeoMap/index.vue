<template>
  <div class="echart-geo-map">
    <div class="filter">
      <div class="name">{{ `指标：` }} </div>
      <el-select
        class="select"
        size="mini"
        placeholder=""
        @change="changeInd"
        v-model="indicator">
        <el-option
          v-for="item in indi"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <div v-if="hasData" class="imageWrapper" ref="imageWrapper">
      <slot>
        <div class="clip">
          <div class="range">
            <div class="range-table">
              <div class="header">
                <div class="header-cap">地域分布排行</div>
                <div class="header-export-img" title="保存为图片" @click="toImage"></div>
              </div>
              <div class="content">
                <div class="echart-rank"></div>
              </div>
            </div>
          </div>
          <div class="echart-map"></div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china'
import html2canvas from 'html2canvas'
import {geoData} from './geoData'
import oRank from './rank'
import oArea from './area'
export default {
  data () {
    return {
      indicator: 'ind1',
      indi: ['ind1', 'ind2', 'ind3', 'ind4', 'ind5', 'ind6', 'ind7', 'ind8', 'ind9'],
      hasData: false,
      rankData: geoData,
      yData: [],
      mapData: [],
      barData: [],
      areaData: [],
      optionRank: oRank,
      optionArea: oArea
    }
  },
  computed: {
  },
  methods: {
    async init () {
      this.hasData = false
      await this.initData()
      this.$nextTick(() => {
        if (this.hasData) {
          this.initRank()
          this.initArea()
        }
      })
    },
    async initData () {
      this.$nextTick(() => {
        if (this.rankData.length === 0) {
          this.hasData = false
        } else {
          this.hasData = true
        }
        this.barData = []
        this.yData = []
        this.mapData = []
        const currentInd = this.indicator

        if (this.hasData) {
          this.rankData.sort((x, y) => {
            if (x[currentInd] > y[currentInd]) {
              return -1
            } else if (x[currentInd] < y[currentInd]) {
              return 1
            } else {
              return 0
            }
          })
          for (let i = 0; i < this.rankData.length; i++) {
            this.barData.push({name: this.rankData[i].PROVINCE, value: this.rankData[i][currentInd]})
            if (i < 9) {
              this.yData.push(' ' + (i + 1) + '     ' + this.rankData[i].PROVINCE)
            } else {
              this.yData.push((i + 1) + '    ' + this.rankData[i].PROVINCE)
            }
          }

          this.areaData = this.rankData.slice()

          this.optionRank.yAxis.data = this.yData
          this.optionRank.series[0].data = this.barData

          this.barData[0].barC = true

          // disable visualMap
          for (let i = 0; i < this.areaData.length; i++) {
            if (this.areaData[i].visualMap === false) {
              this.areaData[i].visualMap = true
            }
            if (i === 0) {
              this.areaData[i].visualMap = false
            }
          }

          this.optionArea.geo.regions = [
            {
              name: this.rankData[0].PROVINCE,
              itemStyle: {
                areaColor: '#FF9933'
              }
            }
          ]
          this.areaData.forEach(item => {
            this.mapData.push({ name: item.PROVINCE, value: item[currentInd], visualMap: item.visualMap })
          })
          this.optionArea.series[0].data = this.mapData
          this.optionArea.visualMap.min = this.rankData[0][currentInd]
          this.optionArea.visualMap.max = this.rankData[this.rankData.length - 1][currentInd]
        }
      })
    },
    toImage () {
      html2canvas(this.$refs.imageWrapper, {
        backgroundColor: null
      }).then((canvas) => {
        let imgData = canvas.toDataURL('image/png')
        this.fileDownload(imgData)
      })
    },
    // 下载图片
    fileDownload (downloadUrl) {
      let aLink = document.createElement('a')
      aLink.style.display = 'none'
      aLink.href = downloadUrl
      aLink.download = '区域分布.png'
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink)
    },
    initRank () {
      this.$nextTick(() => {
        if (this.rankData.length < 34) {
          // 如果数据不足34项排行重新设置echart高度为数据个数*20
          document.getElementsByClassName('echart-rank')[0].style.height = this.rankData.length * 20 + 'px'
        }
        let myRank = echarts.init(document.getElementsByClassName('echart-rank')[0])
        myRank.setOption(this.optionRank)

        myRank.on('mouseover', (params) => {
          const regionToHighlight = this.optionArea.geo.regions.find(item => {
            return item.name === params.data.name
          })
          if (regionToHighlight) {
            regionToHighlight.selected = true
          } else {
            const newRegion = {
              name: params.data.name,
              selected: true
            }
            this.optionArea.geo.regions.push(newRegion)
          }

          // 直接重绘地图
          let myArea = echarts.init(document.getElementsByClassName('echart-map')[0])
          myArea.setOption(this.optionArea)
        })

        myRank.on('mouseout', (params) => {
          const regionToHighlight = this.optionArea.geo.regions.find(item => {
            return item.name === params.data.name
          })
          if (regionToHighlight) {
            regionToHighlight.selected = false
          }
          // 直接重绘地图
          let myArea = echarts.init(document.getElementsByClassName('echart-map')[0])
          myArea.setOption(this.optionArea)
        })

        myRank.on('click', (params) => {
          for (let i = 0; i < this.barData.length; i++) {
            if (params.name === this.barData[i].name) {
              this.barData[i].barC = true
            } else {
              this.barData[i].barC = false
            }
          }
          // 直接重绘bar图
          let myRank = echarts.init(document.getElementsByClassName('echart-rank')[0])
          myRank.setOption(this.optionRank)

          // 直接重绘地图
          // disable visualMap
          for (let i = 0; i < this.mapData.length; i++) {
            if (this.mapData[i].visualMap === false) {
              this.mapData[i].visualMap = true
            }
            if (this.mapData[i].name === params.data.name) {
              this.mapData[i].visualMap = false
            }
          }

          this.optionArea.geo.regions = [
            {
              name: params.data.name,
              itemStyle: {
                areaColor: '#FF9933'
              }
            }
          ]
          let myArea = echarts.init(document.getElementsByClassName('echart-map')[0])
          myArea.setOption(this.optionArea)
        })
      })
    },
    initArea () {
      this.$nextTick(() => {
        let myArea = echarts.init(document.getElementsByClassName('echart-map')[0])
        myArea.setOption(this.optionArea)

        myArea.on('mouseover', (params) => {
          for (let i = 0; i < this.barData.length; i++) {
            if (params.name === this.barData[i].name) {
              this.barData[i].barH = true
              break
            }
          }
          // 直接重绘bar图
          let myRank = echarts.init(document.getElementsByClassName('echart-rank')[0])
          myRank.setOption(this.optionRank)
        })

        myArea.on('mouseout', (params) => {
          for (let i = 0; i < this.barData.length; i++) {
            if (params.name === this.barData[i].name) {
              this.barData[i].barH = false
              break
            }
          }
          // 直接重绘bar图
          let myRank = echarts.init(document.getElementsByClassName('echart-rank')[0])
          myRank.setOption(this.optionRank)
        })

        myArea.on('click', (params) => {
          if (!params.data) {
            return // 无数据项无点击交互
          }
          for (let i = 0; i < this.barData.length; i++) {
            if (params.name === this.barData[i].name) {
              this.barData[i].barC = true
            } else {
              this.barData[i].barC = false
            }
          }
          // 直接重绘bar图
          let myRank = echarts.init(document.getElementsByClassName('echart-rank')[0])
          myRank.setOption(this.optionRank)

          // 直接重绘排行图
          // disable visualMap
          for (let i = 0; i < this.mapData.length; i++) {
            if (this.mapData[i].visualMap === false) {
              this.mapData[i].visualMap = true
            }
            if (this.mapData[i].name === params.data.name) {
              this.mapData[i].visualMap = false
            }
          }

          this.optionArea.geo.regions = [
            {
              name: params.data.name,
              itemStyle: {
                areaColor: '#FF9933'
              }
            }
          ]
          let myArea = echarts.init(document.getElementsByClassName('echart-map')[0])
          myArea.setOption(this.optionArea)
        })
      })
    },
    changeInd (val) {
      this.init()
    }
  },
  mounted () {
    this.init()
    window.onresize = () => {
      let myRank = echarts.init(document.getElementsByClassName('echart-rank')[0])
      myRank.resize()
      let myArea = echarts.init(document.getElementsByClassName('echart-map')[0])
      myArea.resize()
    }
  }
}
</script>

<style scoped lang="less">
  .echart-geo-map{
    height: 100%;
    width: 100%;
    .filter {
      height: 44px;
      text-align: left;
      border-bottom: 1px solid #E7E9F0;
      .name {
        color: #999999;
        line-height: 44px;
        display: inline-block;
        margin-left: 22px;
      }
    }
    .imageWrapper {
      height: calc(100% - 50px);
      width: 100%;
      .clip {
        display: inline-block;
        height: 100%;
        width: 100%;
        .range {
          display: inline-block;
          height: calc(100% - 16px);
          width: 33%;
          .range-table {
            width: calc(100% - 22px);
            height: 100%;
            margin-left: 22px;
            border: 1px solid #E7E9F0;
            .header {
              height: 30px;
              line-height: 30px;
              background: rgba(249, 249, 249, 0.5);
              .header-cap {
                float: left;
                margin-left: 40px;
              }
              .header-export-img {
                float: right;
                margin: 6px 12px 0 0;
                height: 16px;
                width: 16px;
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABLklEQVQ4T+WTP0vDUBRHz20HQaziIPoFXFzqJhTU3Vk/gFBNdJDEwclOjg5JBzGVgu52VRDc/ADiIg6CCC7qYh38W3rlFRNiiCHg6Bvfvefw3u9yhT8eyeJXPK2a+q4rzd/6MgWWr2cGbDgy/V8EVV9HS12evXV5NX9OZrC6o2Mv/TwdLMpbmMmPEA0gMNKB2aYj93HBUl0rReUEpR64spkqWPZ1qgCnKA8doVKElmkUpQYcq3D7UWBmf00eUwXmMi5B+ASGgGGFmyTck6fNN5LAgKkrXKXBkcD2tYVyEbiyFQpDicJdErY9rSGUA0fmey+wfL1GOW+4shB/kUm97512OJWwZnl6KDAZuDIeCQQGUS5z7ZYwgdKOBLanG8BcLvi7qSsc7TmynblMeYRfoziGETybwmsAAAAASUVORK5CYII=");
                cursor: pointer;
              }
            }
            .content {
              height: calc(100% - 30px);
              overflow-y: scroll;
              .echart-rank {
                height: 680px;
                width: 100%;
              }
            }
          }
        }
        .echart-map {
          display: inline-block;
          height: 100%;
          width: 66%;
        }
      }
    }
  }
</style>
<style>
  .range-table>.content::-webkit-scrollbar{/*滚动条整体部分，其中的属性有width,height,background,border等（就和一个块级元素一样）*/
    width: 8px;
    height: 0;
  }
  .range-table>.content::-webkit-scrollbar-thumb{/*滚动条里面可以拖动的那部分*/
    background: #C9C9C9;
    border-radius: 3px;
  }
</style>
