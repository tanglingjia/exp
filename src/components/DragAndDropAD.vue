<template>
  <div class="draganddropad">
    <div class="top">
      <div class="first-level">
        <div class="first-level-item" v-for="(item, index) in labels" :key="index" :title="item.name">
          {{ item.name }}
        </div>
      </div><div class="other-level">
        <div class="top">
          <i-input class="search" icon="ios-search" placeholder="搜索标签值" size="small"></i-input>
        </div>
        <div class="content">
          <div v-for="(item1, index1) in labels[0].value" :key="index1" class="second-level">
            <div class="name">
              {{ item1.name }}
            </div>
            <div class="third-level">
              <div v-for="(item2, index2) in item1.value" :key="index2" class="third-level-item">
                {{ item2.name }}
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

  },
  mounted () {

  },
  data () {
    return {
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
                  ]
                },
                {
                  name: '三级标签2',
                  value: [
                  ]
                }
              ]
            },
            {
              name: '网络属性',
              value: [
              ]
            },
            {
              name: '地域属性',
              value: [
              ]
            },
            {
              name: '推送设备品牌',
              value: [
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
    width: 900px;
    height: 450px;
    margin: 10px 0 0 10px;
    font-size: 12px;
    .top {
      height: 225px;
      width: 900px;
      .first-level {
        display: inline-block;
        width: 130px;
        height: 225px;
        border: 1px solid #d9d9d9;
        overflow-y: scroll;
        .first-level-item {
          line-height: 28px;
          border-bottom: 1px solid #d9d9d9;
          color: #32AD5B;
          cursor: pointer;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .other-level {
        display: inline-block;
        width: 768px;
        height: 225px;
        .top {
          height: 30px;
          width: 768px;
          border: 1px solid #d9d9d9;
          .search {
            display:table-cell;
            width:200px;
          }
        }
        .content {
          height: 195px;
          width: 768px;
          overflow-y: scroll;
          .second-level {
            display: inline-block;
            width: 750px;
            height: 100px;
            margin-top: 5px;
            .name {
              display: inline-block;
              width: 135px;
              height: 100px;
              background-color: #F2F2F2;
              line-height: 100px;
            }
            .third-level {
              display: inline-block;
              width: 135px;
              height: 100%;
              .third-level-item {
              }
            }
          }
        }
      }
    }
  }
</style>
<style>
  .draganddropad .ivu-input-small {
    height: 28px;
  }

  .first-level::-webkit-scrollbar{/*滚动条整体部分，其中的属性有width,height,background,border等（就和一个块级元素一样）（位置1）*/
    width:2px;
    height: 0;
  }
  .first-level::-webkit-scrollbar-button{/*滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置2）*/
    display:none;
  }

  .first-level::-webkit-scrollbar-track{/*外层轨道，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置3）*/
    /* display: none; */
    width: 10px;
    /*background: #FFFFFF;*/
    /*border-radius: 0.1rem;*/
    /*-webkit-box-shadow: inset 0 0 0.06rem rgba(0,0,0,0.3);*/
  }
  .first-level::-webkit-scrollbar-track-piece{/*内层轨道，滚动条中间部分（位置4）*/
    display:none;
  }
  .first-level::-webkit-scrollbar-thumb{/*滚动条里面可以拖动的那部分（位置5）*/
    background:#C9C9C9;
    opacity: 0.6;
    border-radius:3px;
  }

  /* .other-level>.content::-webkit-scrollbar{
    width: 6px;
    height: 6px;
  }
  .other-level>.content::-webkit-scrollbar-button{
    display:none;
  }

  .other-level>.content::-webkit-scrollbar-track{
    width: 10px;
  }
  .other-level>.content::-webkit-scrollbar-track-piece{
    display:none;
  }
  .other-level>.content::-webkit-scrollbar-thumb{
    background:#C9C9C9;
    opacity: 0.6;
    border-radius:3px;
  } */
</style>
