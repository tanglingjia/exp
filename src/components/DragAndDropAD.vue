<template>
  <div class="draganddropad">
    <div v-if="labels.length" class="top">
      <div class="left">
        <div class="first-level" v-for="(item, index) in labels" :key="index" :title="item.name">
          {{ item.name }}
        </div>
      </div><div class="right">
        <div class="top">
          <i-input v-model="searchValue" class="search" icon="ios-search" placeholder="搜索标签值" size="small"></i-input>
        </div>
        <div class="content">
          <div v-for="(item1, index1) in labels[0].value.filter(item => {return !item.draggedOut})" :key="index1" class="second-level" >
            <div class="name" :style="{'line-height': computeLineHeight(item1)}">
              {{ item1.name }}
            </div>
            <div class="second-level-content">
              <div v-for="(item2, index2) in item1.value.filter(item => {return !item.draggedOut})" :key="index2" class="third-level" :style="(item1.value.filter(item => {return !item.draggedOut}).length > 0 && index2 !== item1.value.filter(item => {return !item.draggedOut}).length - 1 ) ? {marginBottom: '5px'} : {marginBottom: '0'}">
                <div class="item">
                  <div class="drag parent" :title="item2.name" @mousedown="moveMe" :data-id="item2.id">
                    {{ item2.name }}
                  </div>
                </div>
                <div class="third-level-content">
                  <div v-for="(item3, index3) in item2.value.filter(item => {return !item.draggedOut})" :key="index3" class="third-level-item" :style="item2.value.length <= 6 || (item2.value.length > 6 && (Math.floor(index3 / 6) === Math.floor((item2.value.length - 1) / 6))) ? {marginBottom: '0'} : {marginBottom: '5px'}">
                    <div class="drag child" :title="item3.name" @mousedown="moveMe" :data-id="item3.id">
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
    <div class="condition-first-level" style="overflow-y:auto;">
      <i-select v-if="conditions.bool && conditions.bool.operation" v-model="conditions.bool.operation" size="small" style="display:block;width:60px;margin:10px 0 0 10px;">
        <i-option v-for="item in operationList" :value="item.value" :key="item.id">{{ item.value }}</i-option>
      </i-select>
      <div v-if="conditions.bool" :style="{width:'780px', margin: conditions.bool.operation ? '0 70px 0 70px' : '30px 70px 0 70px'}">
        <div v-for="(item1, index1) in conditions.bool.and ? conditions.bool.and : conditions.bool.or" :key="index1" :style="{display:'inline-block',height:computeBlockHeight(conditions.bool.and ? conditions.bool.and : conditions.bool.or, index1), 'margin-bottom': '30px'}">
          <div class="condition-second-level" :style="{width:'360px',border:'1px solid #d9d9d9','background-color':'#F6FFED','margin-left':index1 % 2 === 0 ? '0px' : '50px'}">
            <Icon @click="closeFirst(index1)" type="md-close" style="float:right;margin:5px 5px 0 0;cursor:pointer;"/>
            <div v-if="item1.bool.operation" style="display:table-cell;width:80px;vertical-align:top;">
              <i-select v-if="item1.bool.operation" v-model="item1.bool.operation" size="small" style="display:block;width:60px;margin:10px 0 0 10px;">
                <i-option v-for="item in operationList" :value="item.value" :key="item.id">{{ item.value }}</i-option>
              </i-select>
            </div>
            <div class="condition-third-level" v-for="(item2, index2) in item1.bool.and ? item1.bool.and : item1.bool.or" :key="index2" :style="{border:'1px solid #d9d9d9','margin-left':'70px','margin-right':'70px','margin-top':item1.bool.operation ? '0' : '30px','margin-bottom':item1.bool.operation? (index2 === (item1.bool.and ? item1.bool.and.length - 1 : item1.bool.or.length - 1) ? '30px' : '10px') : '30px','background-color':'#FFFBED','padding': item2.bool.operation ? '10px 0 0 0' : '10px 59px 10px 59px'}">
              <Icon @click="closeSecond(index1, index2)" type="md-close" style="cursor:pointer;float:right;margin:-8px -57px 0 0"/>
              <div v-if="item2.bool.operation" style="display:table-cell;width:80px;vertical-align:top;">
                <i-select v-model="item2.bool.operation" size="small" style="width:60px;">
                  <i-option v-for="item in operationList" :value="item.value" :key="item.id">{{ item.value }}</i-option>
                </i-select>
              </div>
              <div v-if="item2.bool.operation" style="display:table-cell;width:120px;">
                <div v-for="(item3, index3) in item2.bool.andActual ? item2.bool.andActual : item2.bool.orActual" :key="index3" style="width:100px;height:30px;margin-bottom:10px;">
                  <div :class="item3.type === 'thirdLevel' ? 'parent' : 'child'" @mousedown="moveMe" :title="item3.value" :data-id="item3.id" :style="{width:'100px',height:'30px','background-color':item3.type === 'thirdLevel' ? '#00CCFF' : '#009933',color:'#FFFFFF','border-radius':'5px','line-height':'30px', 'white-space': 'nowrap','text-overflow': 'ellipsis', overflow: 'hidden'}">
                    {{ item3.value }}
                  </div>
                </div>
              </div>
              <div v-else style="display:table-cell;width:100px;height:30px;">
                <div :class="(item2.bool.andActual ? item2.bool.andActual[0].type : item2.bool.orActual[0].type) === 'thirdLevel' ? 'parent' : 'child'" @mousedown="moveMe" :title="item2.bool.andActual ? item2.bool.andActual[0].value : item2.bool.orActual[0].value" :data-id="item2.bool.andActual ? item2.bool.andActual[0].id : item2.bool.orActual[0].id" :style="{width:'100px',height:'30px','background-color':(item2.bool.andActual ? item2.bool.andActual[0].type : item2.bool.orActual[0].type) === 'thirdLevel' ? '#00CCFF' : '#009933',color:'#FFFFFF','border-radius':'5px','line-height':'30px','white-space': 'nowrap','text-overflow': 'ellipsis', overflow: 'hidden'}">
                  {{ item2.bool.andActual ? item2.bool.andActual[0].value : item2.bool.orActual[0].value }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="selector" ref='selectorPopup' v-show="showSelector" style="position:absolute; width:82px; height:57px;border:1px solid #d9d9d9;z-index:1;background-color:#FFFFFF;">
        <div @click="updateDragAndDrop(location, dragType, id, title, centerPositionX, centerPositionY, 'and')" style="width:68px;height:20px;background-color:#169BD5;color:#FFFFFF;border-radius:5px;margin-top:5px;margin-left:6px;cursor:pointer">{{ `交集` }}</div>
        <div @click="updateDragAndDrop(location, dragType, id, title, centerPositionX, centerPositionY, 'or')" style="width:68px;height:20px;background-color:#169BD5;color:#FFFFFF;border-radius:5px;margin-top:5px;margin-left:6px;cursor:pointer">{{ `并集` }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
  },
  methods: {
    // 计算下部组合块高度
    computeBlockHeight (all, index) {
      let leftDiv = null
      let rightDiv = null
      if (index % 2 === 0) {
        leftDiv = all[index]
        if (all.length > index + 1) {
          rightDiv = all[index + 1]
        }
      } else {
        leftDiv = all[index - 1]
        rightDiv = all[index]
      }
      let leftHeight = this.computeHeight(leftDiv)
      let rightHeight = 0
      if (rightDiv) {
        rightHeight = this.computeHeight(rightDiv)
      }
      return leftHeight > rightHeight ? (leftHeight + 'px') : (rightHeight + 'px')
    },
    computeHeight (block) {
      let blockHight = 0
      let currentBlock = block.bool.and ? block.bool.and : block.bool.or
      blockHight += 60 + (currentBlock.length - 1) * 10 // 外层部分高度
      currentBlock.forEach(item => {
        let currentSubBlock = item.bool.and ? item.bool.and : item.bool.or
        blockHight += currentSubBlock.length * 30 + (currentSubBlock.length + 1) * 10 // 内层部分高度
      })
      return blockHight
    },
    // 计算二级line-height
    computeLineHeight (item) {
      // line-height计算方式：30px * lineCount + 5px * lineCount - 1 (5px为上下之间margin)
      let lineCount = 0
      item.value.forEach(thirdLevel => {
        if (!thirdLevel.draggedOut) {
          lineCount += Math.ceil(thirdLevel.value.filter(item => { return !item.draggedOut }).length / 6)
        }
      })
      return (30 * lineCount) + (5 * (lineCount - 1)) + 'px'
    },
    moveMe (e) {
      let odiv = e.target
      if (odiv.className.indexOf('drag') >= 0) {
        this.moveType = 1
      } else {
        this.moveType = 2
      }
      const scrollPositionDrag = document.getElementsByClassName('content')[0].scrollTop
      const scrollPositionDrop = document.getElementsByClassName('condition-first-level')[0].scrollTop
      odiv.style.position = 'absolute'
      odiv.style.zIndex = 1
      this.positionX = odiv.offsetLeft // 起始横坐标
      this.positionY = odiv.offsetTop // 起始纵坐标
      let x = e.clientX - this.positionX // 点击位置距元素左侧距离
      let y = e.clientY - this.positionY // 点击位置距元素上部距离
      if (this.moveType === 1) {
        if (scrollPositionDrag > 0) {
          odiv.style.top = (odiv.offsetTop - scrollPositionDrag) + 'px'
        }
      } else {
        if (scrollPositionDrop > 0) {
          odiv.style.top = (odiv.offsetTop - scrollPositionDrop) + 'px'
        }
      }
      document.onmousemove = (e) => {
        let left = e.clientX - x // 元素随鼠标拖拽移动，元素左侧的位置
        let top = e.clientY - y // 元素随鼠标拖拽移动，元素上部的位置
        odiv.style.left = left + 'px'
        if (this.moveType === 1) {
          odiv.style.top = scrollPositionDrag > 0 ? (top - scrollPositionDrag + 'px') : (top + 'px')
        } else {
          odiv.style.top = scrollPositionDrop > 0 ? (top - scrollPositionDrop + 'px') : (top + 'px')
        }
      }
      document.onmouseup = (e) => {
        const itemId = odiv.getAttribute('data-id')
        const itemTitle = odiv.getAttribute('title')
        const type = odiv.className.indexOf('parent') >= 0 ? 'thirdLevel' : 'thirdLevelItem'
        const centerPositionY = parseInt(odiv.style.top.replace('px', '')) + 15
        const centerPositionX = parseInt(odiv.style.left.replace('px', '')) + (type === 'thirdLevel' ? 65 : 40)
        if (this.moveType === 2) {
          this.removeFromDrop(type, itemTitle, parseInt(itemId))
        }
        const locationTo = this.isLocatedToWhere(centerPositionX, centerPositionY)
        if (locationTo.firstLevel) {
          this.updateDragAndDrop(locationTo, type, parseInt(itemId), itemTitle, centerPositionX, centerPositionY, '')
        }
        odiv.style.position = 'inherit'
        odiv.style.zIndex = 0 // 恢复被移动的元素浮层级别
        odiv.style.top = this.positionY + 'px' // 元素归位
        odiv.style.left = this.positionX + 'px' // 元素归位
        document.onmousemove = null // 释放
        document.onmouseup = null // 释放
      }
    },
    // 从条件区域内移除元素
    removeFromDrop (type, title, id) {
      this.copiedConditions = JSON.parse(JSON.stringify(this.conditions))
      // console.log(this.copiedConditions)
      let findFlag = false
      let level1 = 0
      let level2 = 0
      let level3 = 0
      if (this.conditions.bool) {
        const firstLevel = this.conditions.bool.and ? this.conditions.bool.and : this.conditions.bool.or
        for (let i = 0; i < firstLevel.length; i++) {
          if (!findFlag) {
            const secondLevel = firstLevel[i].bool.and ? firstLevel[i].bool.and : firstLevel[i].bool.or
            for (let j = 0; j < secondLevel.length; j++) {
              if (!findFlag) {
                const thirdLevel = secondLevel[j].bool.andActual ? secondLevel[j].bool.andActual : secondLevel[j].bool.orActual
                for (let k = 0; k < thirdLevel.length; k++) {
                  if (!findFlag) {
                    if (thirdLevel[k].type === type) {
                      if (type === 'thirdLevel') {
                        if (thirdLevel[k].value === title) {
                          findFlag = true
                          level1 = i
                          level2 = j
                          level3 = k
                        }
                      } else {
                        if (parseInt(thirdLevel[k].id) === parseInt(id)) {
                          findFlag = true
                          level1 = i
                          level2 = j
                          level3 = k
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
      const firstLevel = this.conditions.bool.and ? this.conditions.bool.and : this.conditions.bool.or
      const secondLevel = firstLevel[level1].bool.and ? firstLevel[level1].bool.and : firstLevel[level1].bool.or
      const thirdLevel = secondLevel[level2].bool.and ? secondLevel[level2].bool.and : secondLevel[level2].bool.or
      const thirdLevelActual = secondLevel[level2].bool.andActual ? secondLevel[level2].bool.andActual : secondLevel[level2].bool.orActual
      thirdLevel.splice(level3, 1)
      thirdLevelActual.splice(level3, 1)
      if (thirdLevel.length === 1) {
        delete secondLevel[level2].bool.operation
        if (secondLevel[level2].bool.or) {
          secondLevel[level2].bool.and = thirdLevel
          delete secondLevel[level2].bool.or
        }
      } else if (thirdLevel.length === 0) {
        secondLevel.splice(level2, 1)
        if (secondLevel.lenth === 1) {
          delete firstLevel[level1].bool.operation
          if (firstLevel[level1].bool.or) {
            firstLevel[level1].bool.and = secondLevel
            delete firstLevel[level1].bool.or
          }
        } else if (secondLevel.length === 0) {
          firstLevel.splice(level1, 1)
          if (firstLevel.length === 1) {
            delete this.conditions.bool.operation
            if (this.conditions.bool.or) {
              this.conditions.bool.and = firstLevel
              delete this.conditions.bool.or
            }
          } else if (firstLevel.length === 0) {
            this.conditions = {}
          }
        }
      }
    },
    // 判断拖拽到了哪一个区块，返回结构如{firstLevel: 1, secondeLevel: 2}，数字代表根据位置获取到拖拽位置，拖拽到了合理范围外的区域返回{}
    // flag = 1起始位置；flag = 2终点位置
    isLocatedToWhere (centerPositionX, centerPositionY) {
      let toLocation = {}
      // 组织页面条件结构
      const firstLevel = document.getElementsByClassName('condition-first-level')[0]
      if (this.fallInDiv(centerPositionX, centerPositionY, firstLevel, false)) {
        // 只有在面板区域内的才视为有效拖拽，以外的元素归位
        const secondLevels = firstLevel.getElementsByClassName('condition-second-level')
        if (secondLevels.length) {
          let findFlag = false
          // 代表条件区域已有条件，对于每一个二级块，先遍历所有三级块，如果拖拽到三级块内视为拖拽到三级
          for (let i = 0; i < secondLevels.length; i++) {
            if (findFlag) {
              break
            } else {
              const thirdLevels = secondLevels[i].getElementsByClassName('condition-third-level')
              if (thirdLevels.length) {
                for (let j = 0; j < thirdLevels.length; j++) {
                  if (this.fallInDiv(centerPositionX, centerPositionY, thirdLevels[j], true)) {
                    toLocation = { firstLevel: (i + 1), secondLevel: (j + 1) }
                    findFlag = true
                    break
                  }
                }
              }
              if (!findFlag) {
                if (this.fallInDiv(centerPositionX, centerPositionY, secondLevels[i], true)) {
                  toLocation = { firstLevel: (i + 1) }
                  findFlag = true
                }
              }
            }
          }
          if (!findFlag) {
            // 拖拽到了一级的空白区域，落成新一个二级
            toLocation = { firstLevel: secondLevels.length + 1 }
          }
        } else {
          // 条件区域无任何，拖进来的是第一个
          toLocation = { firstLevel: 1 }
        }
      }
      return toLocation
    },
    // 拖拽元素至当前位置是否落到某一div内，withOffset偏移量，将滚动条计算在内，整个pane区域时false，其他true
    fallInDiv (centerPositionX, centerPositionY, div, withOffset) {
      const scrollPosition = document.getElementsByClassName('condition-first-level')[0].scrollTop
      const x1 = div.offsetLeft
      const x2 = div.offsetLeft + div.offsetWidth
      const y1 = withOffset ? (div.offsetTop - scrollPosition) : div.offsetTop
      const y2 = withOffset ? (div.offsetTop + div.offsetHeight - scrollPosition) : (div.offsetTop + div.offsetHeight)
      if (centerPositionX >= x1 && centerPositionX <= x2 && centerPositionY >= y1 && centerPositionY <= y2) {
        return true
      } else {
        return false
      }
    },
    // 拖拽后更新数据：1.location——拖拽至的位置，之前已组装好；2.dragType——thirdLevel三级，thirdLevelItem三级子项；3.id——查询的id，三级本身没有id，三级在装数据的时候id为其第一个子项id，便于查询到进行操作；4.title——标签显示名称；5.selector——交集和并集的选择
    updateDragAndDrop (location, dragType, id, title, centerPositionX, centerPositionY, selector) {
      if (this.updateDrop(location, dragType, id, title, centerPositionX, centerPositionY, selector)) {
        if (this.moveType === 1) {
          this.updateDrag(dragType, id)
        }
      } else {
        this.dragType = dragType
        this.id = id
      }
    },
    // 更新被拖拽区域
    updateDrag (dragType, id) {
      let tempLabels = this.labels.slice()
      let findIndex = false
      for (let i = 0; i < this.labels[0].value.length; i++) {
        if (findIndex) {
          break
        }
        for (let j = 0; j < this.labels[0].value[i].value.length; j++) {
          if (dragType === 'thirdLevel') {
            if (this.labels[0].value[i].value[j].id === id) {
              tempLabels[0].value[i].value[j].draggedOut = true
              findIndex = true
              break
            }
          } else {
            for (let k = 0; k < this.labels[0].value[i].value[j].value.length; k++) {
              if (this.labels[0].value[i].value[j].value[k].id === id) {
                tempLabels[0].value[i].value[j].value[k].draggedOut = true
                findIndex = true
                break
              }
            }
          }
          if (tempLabels[0].value[i].value[j].value.filter(item => { return !item.draggedOut }).length === 0) {
            // 如果相关三级下没有任何三级子项了，将三级也移除
            tempLabels[0].value[i].value[j].draggedOut = true
          }
        }
        if (tempLabels[0].value[i].value.filter(item => { return !item.draggedOut }).length === 0) {
          // 如果相关二级下没有任何三级了，将二级也移除
          tempLabels[0].value[i].draggedOut = true
        }
      }
      this.labels = tempLabels
    },
    // 更新拖拽至区域
    updateDrop (location, dragType, id, title, centerPositionX, centerPositionY, selector) {
      let canUpdate = true // 标识是否能更新数据，当拖拽的为第二个元素时，弹出交集并集选择框，不更新数据
      let conditionContent = this.conditions
      if (!location.secondLevel) {
        if (!this.conditions.bool) {
          // 是拖拽进来的第一个元素
          conditionContent = {
            bool: {
              and: [
                {
                  bool: {
                    and: [
                      {
                        bool: {
                          and: [
                            dragType === 'thirdLevel' ? title : id
                          ],
                          andActual: [
                            {
                              type: dragType,
                              id: id,
                              value: title
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        } else {
          let dataFirstLevel = this.conditions.bool
          let dataFirstLevelArray = dataFirstLevel.and ? dataFirstLevel.and : dataFirstLevel.or
          if (location.firstLevel <= dataFirstLevelArray.length) {
            // 不需要增加新的一级，添加到现有的某一个一级内
            let dataSecondLevel = dataFirstLevelArray[location.firstLevel - 1].bool
            let dataSecondLevelArray = dataSecondLevel.and ? dataSecondLevel.and : dataSecondLevel.or
            if (dataSecondLevelArray.length === 1) {
              if (selector === '') {
                // 拖进来第二个元素，需要弹窗
                let popoup = document.getElementsByClassName('selector')[0]
                this.showSelector = true
                popoup.style.top = centerPositionY + 'px'
                popoup.style.left = centerPositionX + 'px'
                canUpdate = false
                this.location = location
                this.dragType = dragType
                this.id = id
                this.title = title
                this.centerPositionX = centerPositionX
                this.centerPositionY = centerPositionY
              } else {
                // 点击弹窗中交集或并集时调用
                if (selector === 'and') {
                  dataSecondLevel.operation = '交集'
                  dataSecondLevel.and.push(
                    {
                      bool: {
                        and: [
                          this.dragType === 'thirdLevel' ? this.title : this.id
                        ],
                        andActual: [
                          {
                            type: this.dragType,
                            id: this.id,
                            value: this.title
                          }
                        ]
                      }
                    }
                  )
                } else if (selector === 'or') {
                  dataSecondLevel.or = dataSecondLevel.and
                  delete dataSecondLevel.and
                  dataSecondLevel.operation = '并集'
                  dataSecondLevel.or.push(
                    {
                      bool: {
                        and: [
                          this.dragType === 'thirdLevel' ? this.title : this.id
                        ],
                        andActual: [
                          {
                            type: this.dragType,
                            id: this.id,
                            value: this.title
                          }
                        ]
                      }
                    }
                  )
                }
                this.showSelector = false
              }
            } else {
              (dataSecondLevel.and ? dataSecondLevel.and : dataSecondLevel.or).push(
                {
                  bool: {
                    and: [
                      dragType === 'thirdLevel' ? title : id
                    ],
                    andActual: [
                      {
                        type: dragType,
                        id: id,
                        value: title
                      }
                    ]
                  }
                }
              )
            }
          } else {
            // 需要增加新的一级
            if (dataFirstLevelArray.length === 1) {
              if (selector === '') {
                // 拖进来第二个元素，需要弹窗
                let popoup = document.getElementsByClassName('selector')[0]
                this.showSelector = true
                popoup.style.top = centerPositionY + 'px'
                popoup.style.left = centerPositionX + 'px'
                canUpdate = false
                this.location = location
                this.dragType = dragType
                this.id = id
                this.title = title
                this.centerPositionX = centerPositionX
                this.centerPositionY = centerPositionY
              } else {
                // 点击弹窗中交集或并集时调用
                if (selector === 'and') {
                  dataFirstLevel.operation = '交集'
                  dataFirstLevel.and.push(
                    {
                      bool: {
                        and: [
                          {
                            bool: {
                              and: [
                                this.dragType === 'thirdLevel' ? this.title : this.id
                              ],
                              andActual: [
                                {
                                  type: this.dragType,
                                  id: this.id,
                                  value: this.title
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  )
                } else if (selector === 'or') {
                  dataFirstLevel.or = dataFirstLevel.and
                  delete dataFirstLevel.and
                  dataFirstLevel.operation = '并集'
                  dataFirstLevel.or.push(
                    {
                      bool: {
                        and: [
                          {
                            bool: {
                              and: [
                                this.dragType === 'thirdLevel' ? this.title : this.id
                              ],
                              andActual: [
                                {
                                  type: this.dragType,
                                  id: this.id,
                                  value: this.title
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  )
                }
                this.showSelector = false
              }
            } else {
              (dataFirstLevel.and ? dataFirstLevel.and : dataFirstLevel.or).push(
                {
                  bool: {
                    and: [
                      {
                        bool: {
                          and: [
                            dragType === 'thirdLevel' ? title : id
                          ],
                          andActual: [
                            {
                              type: dragType,
                              id: id,
                              value: title
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              )
            }
          }
        }
      } else {
        let dataSecondLevel = (conditionContent.bool.and ? conditionContent.bool.and : conditionContent.bool.or)[location.firstLevel - 1].bool
        let dataThirdLevel = (dataSecondLevel.and ? dataSecondLevel.and : dataSecondLevel.or)[location.secondLevel - 1].bool
        let dataThirdLevelArray = dataThirdLevel.and ? dataThirdLevel.and : dataThirdLevel.or
        let dataThirdLevelActualArray = dataThirdLevel.andActual ? dataThirdLevel.andActual : dataThirdLevel.orActual
        if (dataThirdLevelArray.length === 1) {
          if (selector === '') {
            // 拖进来第二个元素，需要弹窗
            let popoup = document.getElementsByClassName('selector')[0]
            this.showSelector = true
            popoup.style.top = centerPositionY + 'px'
            popoup.style.left = centerPositionX + 'px'
            canUpdate = false
            this.location = location
            this.dragType = dragType
            this.id = id
            this.title = title
            this.centerPositionX = centerPositionX
            this.centerPositionY = centerPositionY
          } else {
            // 点击弹窗中交集或并集时调用
            if (selector === 'and') {
              dataThirdLevel.operation = '交集'
              dataThirdLevel.and.push(this.dragType === 'thirdLevel' ? this.title : this.id)
              dataThirdLevel.and.sort()
              dataThirdLevel.andActual.push(
                {
                  type: this.dragType,
                  id: this.id,
                  value: this.title
                }
              )
              dataThirdLevel.andActual.sort(this.thirdLevelSort)
            } else if (selector === 'or') {
              dataThirdLevel.or = dataThirdLevel.and
              delete dataThirdLevel.and
              dataThirdLevel.orActual = dataThirdLevel.andActual
              delete dataThirdLevel.andActual
              dataThirdLevel.operation = '并集'
              dataThirdLevel.or.push(this.dragType === 'thirdLevel' ? this.title : this.id)
              dataThirdLevel.or.sort()
              dataThirdLevel.orActual.push(
                {
                  type: this.dragType,
                  id: this.id,
                  value: this.title
                }
              )
              dataThirdLevel.orActual.sort(this.thirdLevelSort)
            }
            this.showSelector = false
          }
        } else {
          dataThirdLevelArray.push(dragType === 'thirdLevel' ? title : id)
          dataThirdLevelArray.sort()
          dataThirdLevelActualArray.push(
            {
              type: dragType,
              id: id,
              value: title
            }
          )
          dataThirdLevelActualArray.sort(this.thirdLevelSort)
        }
      }
      this.conditions = conditionContent
      return canUpdate
    },
    // 排序方法，将第三层次的数组按照字符串默认排序
    thirdLevelSort (a, b) {
      const val1 = a.type === 'thirdLevel' ? a.value.toString() : a.id.toString()
      const val2 = b.type === 'thirdLevel' ? b.value.toString() : b.id.toString()
      if (val1 > val2) {
        return 1
      } else if (val1 < val2) {
        return -1
      } else {
        return 0
      }
    },
    closeFirst (index) {
      let dataFirstLevel = this.conditions.bool
      let dataFirstLevelArray = dataFirstLevel.and ? dataFirstLevel.and : dataFirstLevel.or
      if (dataFirstLevelArray.length === 1) {
        this.conditions = {}
      } else if (dataFirstLevelArray.length === 2) {
        dataFirstLevelArray.splice(index, 1)
        if (dataFirstLevel.or) {
          this.conditions = {}
          delete dataFirstLevel.or
        }
        delete dataFirstLevel.operation
        dataFirstLevel.and = dataFirstLevelArray
        this.conditions.bool = dataFirstLevel
      } else {
        dataFirstLevelArray.splice(index, 1)
        this.conditions = {}
        this.conditions.bool = dataFirstLevel
      }
      this.updateDragPane()
    },
    closeSecond (index1, index2) {
      let dataFirstLevel = this.conditions.bool
      let dataFirstLevelArray = dataFirstLevel.and ? dataFirstLevel.and : dataFirstLevel.or
      let dataSecondLevel = dataFirstLevelArray[index1].bool
      let dataSecondLevelArray = dataSecondLevel.and ? dataSecondLevel.and : dataSecondLevel.or
      if (dataSecondLevelArray.length === 1) {
        this.closeFirst(index1)
      } else if (dataSecondLevelArray.length === 2) {
        dataSecondLevelArray.splice(index2, 1)
        if (dataSecondLevel.or) {
          this.conditions = {}
          delete dataSecondLevel.or
        }
        delete dataSecondLevel.operation
        dataSecondLevel.and = dataSecondLevelArray
        this.conditions.bool = dataFirstLevel
      } else {
        dataSecondLevelArray.splice(index2, 1)
        this.conditions = {}
        this.conditions.bool = dataFirstLevel
      }
      this.updateDragPane()
    },
    // 根据拖拽至窗口来判断拖拽窗口状态
    updateDragPane () {
      let thirdLevelArray = [] // 已被拖拽出的三级
      let thirdLevelItemArray = [] // 已被拖拽出的三级子项
      if (this.conditions.bool) {
        const firstLevel = this.conditions.bool.and ? this.conditions.bool.and : this.conditions.bool.or
        firstLevel.forEach(l1 => {
          const secondLevel = l1.bool.and ? l1.bool.and : l1.bool.or
          secondLevel.forEach(l2 => {
            const thirdLevel = l2.bool.andActual ? l2.bool.andActual : l2.bool.orActual
            thirdLevel.forEach(l3 => {
              if (l3.type === 'thirdLevel') {
                thirdLevelArray.push(l3.value)
              } else {
                thirdLevelItemArray.push(l3.id)
              }
            })
          })
        })
      }
      this.labels[0].value.forEach(secondLevel => {
        let isDraggedOut = true
        secondLevel.value.forEach(thirdLevel => {
          if (thirdLevelArray.indexOf(thirdLevel.name) >= 0) {
            thirdLevel.draggedOut = true
          } else {
            thirdLevel.draggedOut = false
            isDraggedOut = false
          }
          thirdLevel.value.forEach(thirdLevelItem => {
            if (thirdLevelItemArray.indexOf(thirdLevelItem.id) >= 0) {
              thirdLevelItem.draggedOut = true
            } else {
              thirdLevelItem.draggedOut = false
            }
          })
        })
        secondLevel.draggedOut = isDraggedOut
      })
    }
  },
  mounted () {
    this.labels = this.allLabels.slice()
    this.$nextTick(e => {
      const _this = this
      document.addEventListener('mousedown', function (e) {
        // 这里用mousedown事件而不用click事件，因为需要相对mouseup事件触发选择框弹出，用click事件导致拖拽的mouseup事件里弹出选择框失败
        if (!_this.$refs.selectorPopup.contains(e.target)) {
          _this.showSelector = false
        }
      })
    })
  },
  watch: {
    searchValue (newVal) {
      const paneScroll = document.getElementsByClassName('content')[0]
      let labels = document.getElementsByClassName('drag')
      if (labels) {
        if (newVal === '') {
          for (let i = 0; i < labels.length; i++) {
            if (labels[i].className.indexOf('parent') >= 0) {
              labels[i].className = 'drag parent'
            } else {
              labels[i].className = 'drag child'
            }
          }
          paneScroll.scrollTop = 0
        } else {
          let isScrollToTheFirst = false
          for (let i = 0; i < labels.length; i++) {
            if (labels[i].innerText.indexOf(newVal) >= 0) {
              if (labels[i].className.indexOf('parent') >= 0) {
                labels[i].className = 'drag parent highlight'
              } else {
                labels[i].className = 'drag child highlight'
              }
              if (!isScrollToTheFirst) {
                paneScroll.scrollTop = labels[i].offsetTop - 45
                isScrollToTheFirst = true
              }
            } else {
              if (labels[i].className.indexOf('parent') >= 0) {
                labels[i].className = 'drag parent'
              } else {
                labels[i].className = 'drag child'
              }
            }
          }
        }
      }
    }
  },
  data () {
    return {
      copiedConditions: {}, // 深拷贝condition，便于恢复
      moveType: '1', // 1:标签拖拽到条件框；2:条件框内拖拽
      showSelector: false,
      location: {},
      dragType: '',
      id: 0,
      title: '',
      centerPositionX: 0,
      centerPositionY: 0,
      operationList: [
        {
          id: 'and',
          value: '交集'
        },
        {
          id: 'or',
          value: '并集'
        }
      ],
      searchValue: '',
      conditions: {},
      // conditions: {
      //   bool: {
      //     operation: '并集',
      //     or: [
      //       {
      //         bool: {
      //           operation: '交集',
      //           and: [
      //             {
      //               bool: {
      //                 operation: '交集',
      //                 and: [
      //                   1, 2
      //                 ],
      //                 andActual: [
      //                   {
      //                     type: 'thirdLevel',
      //                     id: 1,
      //                     value: '1'
      //                   },
      //                   {
      //                     type: 'thirdLevelItem',
      //                     id: 2,
      //                     value: '2'
      //                   }
      //                 ]
      //               }
      //             },
      //             {
      //               bool: {
      //                 operation: '并集',
      //                 and: [
      //                   3, 4
      //                 ],
      //                 andActual: [
      //                   {
      //                     type: 'thirdLevelItem',
      //                     id: 3,
      //                     value: '3'
      //                   },
      //                   {
      //                     type: 'thirdLevel',
      //                     id: 4,
      //                     value: '4'
      //                   }
      //                 ]
      //               }
      //             }
      //           ]
      //         }
      //       },
      //       {
      //         bool: {
      //           and: [
      //             {
      //               bool: {
      //                 and: [
      //                   5
      //                 ],
      //                 andActual: [
      //                   {
      //                     type: 'thirdLevel',
      //                     id: 5,
      //                     value: '5'
      //                   }
      //                 ]
      //               }
      //             }
      //           ]
      //         }
      //       },
      //       {
      //         bool: {
      //           and: [
      //             {
      //               bool: {
      //                 and: [
      //                   6
      //                 ],
      //                 andActual: [
      //                   {
      //                     type: 'thirdLevel',
      //                     id: 6,
      //                     value: '6'
      //                   }
      //                 ]
      //               }
      //             }
      //           ]
      //         }
      //       }
      //     ]
      //   }
      // },
      allLabels: [
        {
          name: '一级标签类',
          value: [
            {
              name: '二级标签名',
              value: [
                {
                  id: 1,
                  name: '三级标签1',
                  value: [
                    {
                      id: 1,
                      name: '标签值1'
                    },
                    {
                      id: 2,
                      name: '标签值2'
                    },
                    {
                      id: 3,
                      name: '标签值3'
                    },
                    {
                      id: 4,
                      name: '标签值4'
                    }
                  ]
                },
                {
                  id: 5,
                  name: '三级标签2',
                  value: [
                    {
                      id: 5,
                      name: '标签值1'
                    },
                    {
                      id: 6,
                      name: '标签值2'
                    },
                    {
                      id: 7,
                      name: '标签值3'
                    },
                    {
                      id: 8,
                      name: '标签值4'
                    },
                    {
                      id: 9,
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
                  id: 10,
                  name: '运营商',
                  value: [
                    {
                      id: 10,
                      name: '移动'
                    },
                    {
                      id: 11,
                      name: '联通'
                    },
                    {
                      id: 12,
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
                  id: 13,
                  name: '一线城市',
                  value: [
                    {
                      id: 13,
                      name: '北京'
                    },
                    {
                      id: 14,
                      name: '上海'
                    },
                    {
                      id: 15,
                      name: '广州'
                    },
                    {
                      id: 16,
                      name: '深圳'
                    }
                  ]
                },
                {
                  id: 17,
                  name: '三级标签2',
                  value: [
                    {
                      id: 17,
                      name: '标签值1'
                    },
                    {
                      id: 18,
                      name: '标签值2'
                    },
                    {
                      id: 19,
                      name: '标签值3'
                    },
                    {
                      id: 20,
                      name: '标签值4'
                    },
                    {
                      id: 21,
                      name: '标签值5'
                    },
                    {
                      id: 22,
                      name: '标签值6'
                    },
                    {
                      id: 23,
                      name: '标签值7'
                    },
                    {
                      id: 24,
                      name: '标签值8'
                    },
                    {
                      id: 25,
                      name: '标签值9'
                    },
                    {
                      id: 26,
                      name: '标签值10'
                    }
                  ]
                },
                {
                  id: 27,
                  name: '省份',
                  value: [
                    {
                      id: 27,
                      name: '北京'
                    },
                    {
                      id: 28,
                      name: '天津'
                    },
                    {
                      id: 29,
                      name: '上海'
                    },
                    {
                      id: 30,
                      name: '重庆'
                    },
                    {
                      id: 31,
                      name: '河北'
                    },
                    {
                      id: 32,
                      name: '山西'
                    },
                    {
                      id: 33,
                      name: '辽宁'
                    },
                    {
                      id: 34,
                      name: '吉林'
                    },
                    {
                      id: 35,
                      name: '黑龙江'
                    },
                    {
                      id: 36,
                      name: '江苏'
                    },
                    {
                      id: 37,
                      name: '安徽'
                    },
                    {
                      id: 38,
                      name: '浙江'
                    },
                    {
                      id: 39,
                      name: '福建'
                    },
                    {
                      id: 40,
                      name: '江西'
                    },
                    {
                      id: 41,
                      name: '山东'
                    },
                    {
                      id: 42,
                      name: '河南'
                    },
                    {
                      id: 43,
                      name: '湖北'
                    },
                    {
                      id: 44,
                      name: '湖南'
                    },
                    {
                      id: 45,
                      name: '云南'
                    },
                    {
                      id: 46,
                      name: '陕西'
                    },
                    {
                      id: 47,
                      name: '四川'
                    },
                    {
                      id: 48,
                      name: '贵州'
                    },
                    {
                      id: 49,
                      name: '广东'
                    },
                    {
                      id: 50,
                      name: '很长的一个很长的一个很长的一个'
                    },
                    {
                      id: 51,
                      name: '青海'
                    },
                    {
                      id: 52,
                      name: '甘肃'
                    },
                    {
                      id: 53,
                      name: '台湾'
                    },
                    {
                      id: 54,
                      name: '内蒙古'
                    },
                    {
                      id: 55,
                      name: '广西'
                    },
                    {
                      id: 56,
                      name: '新疆'
                    },
                    {
                      id: 57,
                      name: '西藏'
                    },
                    {
                      id: 58,
                      name: '香港'
                    },
                    {
                      id: 59,
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
                  id: 60,
                  name: '安卓终端品牌',
                  value: [
                    {
                      id: 60,
                      name: '标签值1'
                    },
                    {
                      id: 61,
                      name: '标签值2'
                    },
                    {
                      id: 62,
                      name: '标签值3'
                    },
                    {
                      id: 63,
                      name: '标签值4'
                    },
                    {
                      id: 64,
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
      ],
      labels: []
    }
  }
}
</script>
<style scoped lang="less">
  .draganddropad {
    width: 930px;
    height: 450px;
    margin: 10px 0 0 10px;
    font-size: 12px;
    .top {
      height: 225px;
      width: 930px;
      .left {
        float: left;
        width: 130px;
        height: 225px;
        border: 1px solid #d9d9d9;
        overflow-y: auto;
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
        float: left;
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
          overflow-y: auto;
          border-right: 1px solid #d9d9d9;
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
    .condition-first-level {
      width: 930px;
      height: 220px;
      border: 1px solid #d9d9d9;
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
