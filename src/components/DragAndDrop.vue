<template>
  <div>
    <div id="mydrag" class="mydrag" :style="{'margin-left':'100px','margin-top':'100px',width:'120px',height:'190px',border:'1px solid red'}">
      <div class="ordereditem" v-for="(item, index) in orderedItems" :key="index" @mousedown="move" :style="{
          color: 'white',
          'background-color':'red',
          position: 'absolute',
          width: '100px',
          height: '20px',
          left: (containerLeft + 10) + 'px',
          top: (containerTop + 10 + index * 30) +'px',
          cursor: 'pointer'}"
      >{{ item }}</div>
    </div>
    <div>
      <div @mousedown="moveMe" style="background-color:red;margin: 10px;height:100px;width:100px">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sourceItems: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'],
      orderedItems: [],
      startIndex: 0,
      endIndex: 0,
      positionX: 0,
      positionY: 0,
      containerLeft: 0,
      containerTop: 0,
      positions: []
    }
  },
  computed: {
  },
  methods: {
    move (e) {
      let odiv = e.target // 获取目标元素
      odiv.style.zIndex = 1 // 被移动的元素处于浮层最上
      // this.positionX = odiv.offsetLeft // 起始横坐标
      this.positionY = odiv.offsetTop // 起始纵坐标
      // let x = e.clientX - odiv.offsetLeft // 点击位置距元素左侧距离
      let y = e.clientY - this.positionY // 点击位置距元素上部距离
      this.startIndex = this.locateIndex(this.positionY - this.containerTop + 20 / 2) // 从被移动元素起始位置判断被移动元素的索引，参数计算的是元素的中心点纵坐标
      document.onmousemove = (e) => {
        // let left = e.clientX - x // 元素随鼠标拖拽移动，元素左侧的位置
        let top = e.clientY - y // 元素随鼠标拖拽移动，元素上部的位置
        if (top <= this.containerTop + 10) {
          top = this.containerTop + 10
        } else if (top >= this.containerTop + 160) {
          top = this.containerTop + 160
        }
        odiv.style.left = (this.containerLeft + 10) + 'px'
        odiv.style.top = top + 'px'
      }
      document.onmouseup = (e) => {
        this.endIndex = this.locateIndex(odiv.style.top.replace('px', '') - this.containerTop + 20 / 2) // 从被移动元素终点位置判断被移动到的位置索引，参数计算的是元素的中心点纵坐标
        // 交换startIndex与endIndex上的元素，这里要进行深拷贝
        let ary = this.orderedItems.slice()
        const temp = ary[this.startIndex]
        ary[this.startIndex] = ary[this.endIndex]
        ary[this.endIndex] = temp
        this.orderedItems = ary
        odiv.style.zIndex = 0 // 恢复被移动的元素浮层级别
        odiv.style.top = this.positionY + 'px' // 元素归位
        document.onmousemove = null // 释放
        document.onmouseup = null // 释放
      }
    },
    // 起始或终点坐标对应的元素索引
    locateIndex (offsetMiddle) {
      for (let i = 0; i < this.positions.length; i++) {
        if (offsetMiddle <= this.positions[i]) {
          return i
        }
      }
      return this.positions.length // 超过最后一个分界点的情况
    },
    moveMe (e) {
      let odiv = e.target
      odiv.style.position = 'absolute'
      odiv.style.zIndex = 1
      this.positionX = odiv.offsetLeft // 起始横坐标
      this.positionY = odiv.offsetTop // 起始纵坐标
      let x = e.clientX - this.positionX // 点击位置距元素左侧距离
      let y = e.clientY - this.positionY // 点击位置距元素上部距离
      document.onmousemove = (e) => {
        let left = e.clientX - x // 元素随鼠标拖拽移动，元素左侧的位置
        let top = e.clientY - y // 元素随鼠标拖拽移动，元素上部的位置
        odiv.style.left = left + 'px'
        odiv.style.top = top + 'px'
      }
      document.onmouseup = (e) => {
        odiv.style.position = 'inherit'
        odiv.style.zIndex = 0 // 恢复被移动的元素浮层级别
        odiv.style.top = this.positionY + 'px' // 元素归位
        odiv.style.left = this.positionX + 'px' // 元素归位
        document.onmousemove = null // 释放
        document.onmouseup = null // 释放
      }
    }
  },
  mounted () {
    this.orderedItems = this.sourceItems.slice() // 目标元素列表
    // 移动位置分界坐标
    // 本例中有6个元素，需要5个分界点，[35, 65, 95, 125, 155]，以此判断进行吸附
    let accumulatedY = 0
    accumulatedY += 10
    for (let i = 1; i < this.orderedItems.length; i++) {
      this.positions.push(accumulatedY + (20 + 10) * i - 10 / 2)
    }
    // 定时方法以解决绝对定位元素找父容器位置问题
    setTimeout(() => {
      const container = document.getElementById('mydrag')
      this.containerLeft = container.offsetLeft
      this.containerTop = container.offsetTop
    }, 0)
  }
}
</script>
<style>
/* 文字不能被选中 */
.mydrag {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
