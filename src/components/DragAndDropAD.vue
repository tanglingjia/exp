<template>
  <div class="draganddropad">
    <div class="top">
      <div class="left">
        <div class="first-level" v-for="(item, index) in labels" :key="index" :title="item.name">
          {{ item.name }}
        </div>
      </div><div class="right">
        <div class="top">
          <i-input v-model="searchValue" class="search" icon="ios-search" placeholder="搜索标签值" size="small"></i-input>
        </div>
        <div class="content">
          <div v-for="(item1, index1) in labels[0].value" :key="index1" class="second-level" >
            <div class="name">
              {{ item1.name }}
            </div>
            <div class="second-level-content">
              <div v-for="(item2, index2) in item1.value" :key="index2" class="third-level" :style="(item1.value.length > 0 && index2 !== item1.value.length - 1 ) ? {marginBottom: '5px'} : {marginBottom: '0'}">
                <div class="item">
                  <div :class="(searchValue.trim() != '' && item2.name.indexOf(searchValue) >= 0) ? 'drag highlight' : 'drag'" :title="item2.name" @mousedown="moveMe">
                    {{ item2.name }}
                  </div>
                </div>
                <div class="third-level-content">
                  <div v-for="(item3, index3) in item2.value" :key="index3" @mousedown="moveMe" class="third-level-item" :style="item2.value.length <= 6 || (item2.value.length > 6 && (Math.floor(index3 / 6) === Math.floor((item2.value.length - 1) / 6))) ? {marginBottom: '0'} : {marginBottom: '5px'}">
                    <div :class="(searchValue.trim() != '' && item3.name.indexOf(searchValue) >= 0) ? 'drag highlight' : 'drag'" :title="item3.name">
                      {{ item3.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
  },
  methods: {
    moveMe (e) {
      const scrollPosition = document.getElementsByClassName('content')[0].scrollTop
      this.isClicked = true
      let odiv = e.target
      odiv.style.position = 'absolute'
      odiv.style.zIndex = 1
      this.positionX = odiv.offsetLeft // 起始横坐标
      this.positionY = odiv.offsetTop // 起始纵坐标
      let x = e.clientX - this.positionX // 点击位置距元素左侧距离
      let y = e.clientY - this.positionY // 点击位置距元素上部距离
      if (scrollPosition > 0) {
        odiv.style.top = (odiv.offsetTop - scrollPosition) + 'px'
      }
      document.onmousemove = (e) => {
        let left = e.clientX - x // 元素随鼠标拖拽移动，元素左侧的位置
        let top = e.clientY - y // 元素随鼠标拖拽移动，元素上部的位置
        odiv.style.left = left + 'px'
        odiv.style.top = scrollPosition > 0 ? (top - scrollPosition + 'px') : (top + 'px')
      }
      document.onmouseup = (e) => {
        odiv.style.position = 'inherit'
        odiv.style.zIndex = 0 // 恢复被移动的元素浮层级别
        odiv.style.top = this.positionY + 'px' // 元素归位
        odiv.style.left = this.positionX + 'px' // 元素归位
        document.onmousemove = null // 释放
        document.onmouseup = null // 释放
        this.isClicked = false
      }
    }
  },
  mounted () {
  },
  watch: {
    searchValue (newVal) {
      
    }
  },
  data () {
    return {
      searchValue: '',
      isClicked: false,
      labels: [
        {
          name: '一级标签类',
          value: [
            {
              name: '二级标签名',
              value: [
                {
                  name: '三级标签1',
                  value: [
                    {
                      name: '标签值1'
                    },
                    {
                      name: '标签值2'
                    },
                    {
                      name: '标签值3'
                    },
                    {
                      name: '标签值4'
                    }
                  ]
                },
                {
                  name: '三级标签2',
                  value: [
                    {
                      name: '标签值1'
                    },
                    {
                      name: '标签值2'
                    },
                    {
                      name: '标签值3'
                    },
                    {
                      name: '标签值4'
                    },
                    {
                      name: '标签值5'
                    }
                  ]
                }
              ]
            },
            {
              name: '网络属性',
              value: [
                {
                  name: '运营商',
                  value: [
                    {
                      name: '移动'
                    },
                    {
                      name: '联通'
                    },
                    {
                      name: '电信'
                    }
                  ]
                }
              ]
            },
            {
              name: '地域属性',
              value: [
                {
                  name: '一线城市',
                  value: [
                    {
                      name: '北京'
                    },
                    {
                      name: '上海'
                    },
                    {
                      name: '广州'
                    },
                    {
                      name: '深圳'
                    }
                  ]
                },
                {
                  name: '三级标签2',
                  value: [
                    {
                      name: '标签值1'
                    },
                    {
                      name: '标签值2'
                    },
                    {
                      name: '标签值3'
                    },
                    {
                      name: '标签值4'
                    },
                    {
                      name: '标签值5'
                    },
                    {
                      name: '标签值6'
                    },
                    {
                      name: '标签值7'
                    },
                    {
                      name: '标签值8'
                    },
                    {
                      name: '标签值9'
                    },
                    {
                      name: '标签值10'
                    }
                  ]
                },
                {
                  name: '省份',
                  value: [
                    {
                      name: '北京'
                    },
                    {
                      name: '天津'
                    },
                    {
                      name: '上海'
                    },
                    {
                      name: '重庆'
                    },
                    {
                      name: '河北'
                    },
                    {
                      name: '山西'
                    },
                    {
                      name: '辽宁'
                    },
                    {
                      name: '吉林'
                    },
                    {
                      name: '黑龙江'
                    },
                    {
                      name: '江苏'
                    },
                    {
                      name: '安徽'
                    },
                    {
                      name: '浙江'
                    },
                    {
                      name: '福建'
                    },
                    {
                      name: '江西'
                    },
                    {
                      name: '山东'
                    },
                    {
                      name: '河南'
                    },
                    {
                      name: '湖北'
                    },
                    {
                      name: '湖南'
                    },
                    {
                      name: '云南'
                    },
                    {
                      name: '陕西'
                    },
                    {
                      name: '四川'
                    },
                    {
                      name: '贵州'
                    },
                    {
                      name: '广东'
                    },
                    {
                      name: '很长的一个很长的一个很长的一个'
                    },
                    {
                      name: '青海'
                    },
                    {
                      name: '甘肃'
                    },
                    {
                      name: '台湾'
                    },
                    {
                      name: '内蒙古'
                    },
                    {
                      name: '广西'
                    },
                    {
                      name: '新疆'
                    },
                    {
                      name: '西藏'
                    },
                    {
                      name: '香港'
                    },
                    {
                      name: '澳门'
                    }
                  ]
                }
              ]
            },
            {
              name: '推送设备品牌',
              value: [
                {
                  name: '安卓终端品牌',
                  value: [
                    {
                      name: '标签值1'
                    },
                    {
                      name: '标签值2'
                    },
                    {
                      name: '标签值3'
                    },
                    {
                      name: '标签值4'
                    },
                    {
                      name: '标签值5'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: '基础信息标签',
          value: [
          ]
        },
        {
          name: '用户行为标签',
          value: [
          ]
        },
        {
          name: '用户类型标签',
          value: [
          ]
        },
        {
          name: '用户交易标签',
          value: [
          ]
        },
        {
          name: '用户偏好标签',
          value: [
          ]
        },
        {
          name: '成长体系标签',
          value: [
          ]
        },
        {
          name: '各种各样奇奇怪怪乱七八糟标签',
          value: [
          ]
        }
      ]
    }
  }
}
</script>
<style scoped lang="less">
  .draganddropad {
    width: 1000px;
    height: 450px;
    margin: 10px 0 0 10px;
    font-size: 12px;
    .top {
      height: 225px;
      width: 930px;
      .left {
        display: inline-block;
        width: 130px;
        height: 225px;
        border: 1px solid #d9d9d9;
        overflow-y: scroll;
        .first-level {
          line-height: 28px;
          border-bottom: 1px solid #d9d9d9;
          color: #32AD5B;
          cursor: pointer;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .right {
        display: inline-block;
        width: 800px;
        height: 225px;
        .top {
          height: 30px;
          width: 800px;
          border: 1px solid #d9d9d9;
          .search {
            display:flex;
            width:200px;
          }
        }
        .content {
          height: 195px;
          width: 800px;
          overflow-y: scroll;
          .second-level {
            display: flex;
            width: 780px;
            margin-top: 5px;
            .name {
              display: inline-block;
              width: 135px;
              background-color: #F2F2F2;
            }
            .second-level-content {
              display: inline-block;
              width: 645px;
              .third-level {
                display: flex;
                width: 645px;
                .item {
                  display: inline-block;
                  width: 130px;
                  height: 30px;
                  margin-left: 5px;
                  .drag {
                    width: 130px;
                    height: 30px;
                    line-height: 30px;
                    border-radius: 5px;
                    background-color: #00CCFF;
                    color: #FFFFFF;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  }
                  .highlight {
                    color: #FFFF00;
                  }
                }
                .third-level-content {
                  display: inline-block;
                  width: 510px;
                  .third-level-item {
                    float: left;
                    width: 80px;
                    height: 30px;
                    line-height: 30px;
                    color: #FFFFFF;
                    margin-left: 5px;
                    .drag {
                      width: 80px;
                      height: 30px;
                      line-height: 30px;
                      background-color: #009933;
                      color: #FFFFFF;
                      border-radius: 5px;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      overflow: hidden;
                    }
                    .highlight {
                      color: #FFFF00;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
<style>
  /* 文字不能被选中 */
  .draganddropad {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .draganddropad .ivu-input-small {
    height: 28px;
  }

  .draganddropad .left::-webkit-scrollbar{/*滚动条整体部分，其中的属性有width,height,background,border等（就和一个块级元素一样）（位置1）*/
    width:2px;
    height: 0;
  }
  .draganddropad .left::-webkit-scrollbar-button{/*滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置2）*/
    display:none;
  }

  .draganddropad .left::-webkit-scrollbar-track{/*外层轨道，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置3）*/
    /* display: none; */
    width: 10px;
    /*background: #FFFFFF;*/
    /*border-radius: 0.1rem;*/
    /*-webkit-box-shadow: inset 0 0 0.06rem rgba(0,0,0,0.3);*/
  }
  .draganddropad .left::-webkit-scrollbar-track-piece{/*内层轨道，滚动条中间部分（位置4）*/
    display:none;
  }
  .draganddropad .left::-webkit-scrollbar-thumb{/*滚动条里面可以拖动的那部分（位置5）*/
    background:#C9C9C9;
    opacity: 0.6;
    border-radius:3px;
  }

  /* .right>.content::-webkit-scrollbar{
    width: 6px;
    height: 6px;
  }
  .right>.content::-webkit-scrollbar-button{
    display:none;
  }

  .right>.content::-webkit-scrollbar-track{
    width: 10px;
  }
  .right>.content::-webkit-scrollbar-track-piece{
    display:none;
  }
  .right>.content::-webkit-scrollbar-thumb{
    background:#C9C9C9;
    opacity: 0.6;
    border-radius:3px;
  } */
</style>
