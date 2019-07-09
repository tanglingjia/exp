<template>
  <div>
    <el-switch
      v-model="isLong"
      active-text="长"
      inactive-text="短">
    </el-switch>
    <div id="scroll">
      <div v-if="isLong" id="scrollcontent">{{ contentLong }}</div>
      <div v-if="!isLong" id="scrollcontentstatic">{{ contentShort }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contentShort: '欢迎来到tlj的博客',
      contentLong: '欢迎来到tlj的博客',
      isLong: false,
      timer: null
    }
  },
  watch: {
    isLong (newVal) {
      if (newVal) {
        this.timer = setInterval(this.objScroll, 100)
      } else {
        clearInterval(this.timer)
      }
    }
  },
  methods: {
    objScroll () {
      const objParent = document.getElementById('scroll')
      const objChild = document.getElementById('scrollcontent')
      let widthObject = objChild.offsetWidth
      if (parseInt(objChild.style.left) > (widthObject * (-1))) {
        objChild.style.left = parseInt(objChild.style.left) - 1 + 'px'
      } else {
        objChild.style.left = objParent.offsetWidth + 'px'
      }
    }
  }
}
</script>
<style>
  #scroll {
    position: absolute;
    overflow:hidden;
    left: calc(50% - 75px);
    width: 150px;
    height: 21px;
  }
  #scrollcontent {
    position: absolute;
    left:0px;
    white-space:nowrap;
  }
</style>
