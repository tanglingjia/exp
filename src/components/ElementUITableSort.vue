<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    class="tabledata"
    @sort-change="tableSort"
    >
    <el-table-column :render-header="renderH"
      prop="date"
      label="日期"
      sortable="custom"
      width="180"
      :sort-orders="['ascending', 'descending']">
    </el-table-column>
    <el-table-column :render-header="renderH"
      prop="name"
      label="球队"
      sortable="custom"
      width="180"
      :sort-orders="['ascending', 'descending']">
    </el-table-column>
    <el-table-column :render-header="renderH"
      prop="score"
      label="得分"
      sortable="custom"
      :sort-orders="['ascending', 'descending']">
    </el-table-column>
  </el-table>
</template>

<script>
import '../assets/icon/iconfont.css'
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-01',
        name: 'arsenal',
        score: 2
      }, {
        date: '2016-05-03',
        name: 'juventus',
        score: 4
      }, {
        date: '2016-05-05',
        name: 'liverpool',
        score: 1
      }, {
        date: '2016-05-10',
        name: 'ajax',
        score: 3
      }],
      needSortRevert: true
    }
  },
  methods: {
    renderH (h, {column, $index}) {
      if (column.property === 'date') {
        return (
          <div class="tableheader">
            <span>{ column.label }</span>
            <i class="iconfont iconjiantou-copy" style="color:#409eff;"></i>
          </div>
        )
      } else {
        return (
          <div class="tableheader">
            <span>{ column.label }</span>
            <i class="iconfont iconjiantou-copy" style="color:#c0c4cc;"></i>
          </div>
        )
      }
    },
    tableSort ({column, prop, order}) {
      // 排序图标
      var icons = document.getElementsByClassName('tabledata')[0].getElementsByClassName('iconfont')
      // 先重置所有图标
      for (var i = 0; i < icons.length; i++) {
        icons[i].className = 'iconfont iconjiantou-copy'
        icons[i].style.color = '#c0c4cc'
      }
      // needSortRevert为判断是否渲染表格后直接点击日期列
      if (column.property === 'date' && this.needSortRevert) {
        if (order) {
          if (order === 'descending') {
            // 升序
            document.getElementsByClassName(column.id)[0].getElementsByClassName('iconfont')[0].style.color = '#409eff'
          } else {
            // 降序
            document.getElementsByClassName(column.id)[0].getElementsByClassName('iconfont')[0].className = 'iconfont iconjiantou'
            document.getElementsByClassName(column.id)[0].getElementsByClassName('iconfont')[0].style.color = '#409eff'
          }
        }
      } else {
        if (column.property !== 'date' && this.needSortRevert) {
          this.needSortRevert = false
        }
        if (order) {
          if (order === 'ascending') {
            // 升序
            document.getElementsByClassName(column.id)[0].getElementsByClassName('iconfont')[0].style.color = '#409eff'
          } else {
            // 降序
            document.getElementsByClassName(column.id)[0].getElementsByClassName('iconfont')[0].className = 'iconfont iconjiantou'
            document.getElementsByClassName(column.id)[0].getElementsByClassName('iconfont')[0].style.color = '#409eff'
          }
        }
      }

      if (column.property === 'date' && this.needSortRevert) {
        this.tableData.sort((a, b) => {
          if (order === 'descending') {
            // 升序
            if (a[prop] < b[prop]) {
              return -1
            } else if (a[prop] > b[prop]) {
              return 1
            } else {
              return 0
            }
          } else {
            // 降序
            if (a[prop] < b[prop]) {
              return 1
            } else if (a[prop] > b[prop]) {
              return -1
            } else {
              return 0
            }
          }
        })
      } else {
        this.tableData.sort((a, b) => {
          if (order === 'ascending') {
            // 升序
            if (a[prop] < b[prop]) {
              return -1
            } else if (a[prop] > b[prop]) {
              return 1
            } else {
              return 0
            }
          } else {
            // 降序
            if (a[prop] < b[prop]) {
              return 1
            } else if (a[prop] > b[prop]) {
              return -1
            } else {
              return 0
            }
          }
        })
      }
    }
  }
}
</script>
<style>
 .caret-wrapper {
   display: none!important;
 }
</style>
