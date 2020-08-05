<template>
  <div class="group-module">
    <div v-if="isExist('m1')" :style="{position:'absolute',width:'50%',height:'50px','line-height':'50px','font-size':'30px',left:`${getLeft('m1')}`,top:`${getTop('m1')}px`,'background-color':'#556B2F'}">{{1}}</div>
    <div v-if="isExist('m2')" :style="{position:'absolute',width:'50%',height:'50px','line-height':'50px','font-size':'30px',left:`${getLeft('m2')}`,top:`${getTop('m2')}px`,'background-color':'#FF8C00'}">{{2}}</div>
    <div v-if="isExist('m3')" :style="{position:'absolute',width:'50%',height:'100px','line-height':'100px','font-size':'30px',left:`${getLeft('m3')}`,top:`${getTop('m3')}px`,'background-color':'#E9967A'}">{{3}}</div>
    <div v-if="isExist('m4')" :style="{position:'absolute',width:'50%',height:'100px','line-height':'100px','font-size':'30px',left:`${getLeft('m4')}`,top:`${getTop('m4')}px`,'background-color':'#8FBC8B'}">{{4}}</div>
    <div v-if="isExist('m5')" :style="{position:'absolute',width:'50%',height:'50px','line-height':'50px','font-size':'30px',left:`${getLeft('m5')}`,top:`${getTop('m5')}px`,'background-color':'#00CED1'}">{{5}}</div>
    <div v-if="isExist('m6')" :style="{position:'absolute',width:'50%',height:'50px','line-height':'50px','font-size':'30px',left:`${getLeft('m6')}`,top:`${getTop('m6')}px`,'background-color':'#9400D3'}">{{6}}</div>
    <div v-if="isExist('m7')" :style="{position:'absolute',width:'50%',height:'100px','line-height':'100px','font-size':'30px',left:`${getLeft('m7')}`,top:`${getTop('m7')}px`,'background-color':'#696969'}">{{7}}</div>
    <div v-if="isExist('m8')" :style="{position:'absolute',width:'50%',height:'100px','line-height':'100px','font-size':'30px',left:`${getLeft('m8')}`,top:`${getTop('m8')}px`,'background-color':'#1E90FF'}">{{8}}</div>
  </div>
</template>

<script>
export default {
  name: 'dataOverviewNew',
  data () {
    return {
      mPermission: {
        m1: { display: true, size: 1 },
        m2: { display: true, size: 1 },
        m3: { display: true, size: 2 },
        m4: { display: true, size: 2 },
        m5: { display: true, size: 1 },
        m6: { display: true, size: 1 },
        m7: { display: true, size: 2 },
        m8: { display: true, size: 2 }
      }, // 没权限前暂时用来做模块布局
      allModules: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8'],
      logicOrder: [],
      uiOrder: [],
      leftModules: [],
      rightModules: [],
      accLeftHeight: 0,
      accRightHeight: 0
    }
  },
  computed: {
  },
  mounted () {
    this.allModules.forEach(m => {
      if (this.mPermission[m].display) {
        this.logicOrder.push({ name: m, size: this.mPermission[m].size })
      }
    })
    let moduleCount = this.logicOrder.length // 总共的模块数
    let locateNum = 0 // 已经放置的模块数
    let finishCurrentRow = true // 已经填满了某一横行
    while (locateNum < moduleCount) {
      if (finishCurrentRow) { // 新的一行
        let nextModule = this.locateNextModule()
        this.uiOrder.push({ name: nextModule.name, size: nextModule.size, isLeft: true })
        locateNum++
        finishCurrentRow = false
      } else { // 放右边元素
        let leftSize = this.uiOrder[locateNum - 1].size
        let rightSize = 0
        while (locateNum < moduleCount && leftSize !== rightSize) { // 左右高度不相等时，进行放置，相等则完成此行放置
          let nextModule = this.locateNextModule()
          if (leftSize < rightSize) { // 左边放，直接放
            this.uiOrder.push({ name: nextModule.name, size: nextModule.size, isLeft: true })
            locateNum++
            leftSize += nextModule.size
          } else { // 右边放
            if (leftSize >= rightSize + nextModule.size) { // 右边放完后若没有超出左边高度，直接放
              this.uiOrder.push({ name: nextModule.name, size: nextModule.size, isLeft: false })
              locateNum++
              rightSize += nextModule.size
            } else { // 右边放完后超出了左边高度，这时候先找到下一个放到左边，再放右边
              if (locateNum + 1 < moduleCount) { // 如果有下一个元素才找，如果此时已经是最后一个元素那就不用找了
                let nextLeftModule = this.locateNextModule(nextModule)
                this.uiOrder.push({ name: nextLeftModule.name, size: nextLeftModule.size, isLeft: true })
                locateNum++
                leftSize += nextLeftModule.size
              }
              this.uiOrder.push({ name: nextModule.name, size: nextModule.size, isLeft: false })
              locateNum++
              rightSize += nextModule.size
            }
          }
        }
        finishCurrentRow = true
      }
    }
    this.accLeftHeight = 0
    this.accRightHeight = 0
    this.uiOrder.forEach(uO => {
      if (uO.isLeft) {
        let leftModule = uO
        leftModule.top = this.accLeftHeight
        this.accLeftHeight += leftModule.size * 50
        this.leftModules.push(leftModule)
      } else {
        let rightModule = uO
        rightModule.top = this.accRightHeight
        this.accRightHeight += rightModule.size * 50
        this.rightModules.push(rightModule)
      }
    })
    while (this.leftModules.length < 4) {
      this.leftModules.push({ name: 'fakeModule', size: 0, isLeft: true, top: this.accLeftHeight })
    }
    while (this.rightModules.length < 4) {
      this.rightModules.push({ name: 'fakeModule', size: 0, isLeft: false, top: this.accRightHeight })
    }
    this.resize()
  },
  methods: {
    locateNextModule (exceptOne) { // exceptOne:需要额外排除，放右边之前需要先向左边放一个时
      let nextModule = {}
      for (let i = 0; i < this.logicOrder.length; i++) {
        const isAlreadyLocated = this.uiOrder.find(uM => {
          return uM.name === this.logicOrder[i].name
        })
        if (!isAlreadyLocated) {
          if (exceptOne && exceptOne.name === this.logicOrder[i].name) {
            continue
          }
          nextModule = this.logicOrder[i]
          break
        }
      }
      return nextModule
    },
    isExist (moduleName) {
      const isInLeft = this.leftModules.find(m => {
        return m.name === moduleName
      })
      if (isInLeft) {
        return true
      } else {
        const isInRight = this.rightModules.find(m => {
          return m.name === moduleName
        })
        if (isInRight) {
          return true
        } else {
          return false
        }
      }
    },
    getLeft (moduleName) {
      const isInLeft = this.leftModules.find(m => {
        return m.name === moduleName
      })
      if (isInLeft) {
        return '0%'
      } else {
        return '50%'
      }
    },
    getTop (moduleName) {
      const isInLeft = this.leftModules.find(m => {
        return m.name === moduleName
      })
      if (isInLeft) {
        return isInLeft.top
      } else {
        const isInRight = this.rightModules.find(m => {
          return m.name === moduleName
        })
        if (isInRight) {
          return isInRight.top
        } else {
          return 0
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.group-module {
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}
</style>
