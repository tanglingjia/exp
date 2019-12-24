import Vue from 'vue'
import Router from 'vue-router'
import asyncupdatedqueue from '@/components/AsyncUpdatedQueue'
import elementuitablesort from '@/components/ElementUITableSort'
import draganddrop from '@/components/DragAndDrop'
import draganddropad from '@/components/draganddropad'
import rolling from '@/components/Rolling'
import echartgeomap from '@/components/EchartGeoMap/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/asyncupdatedqueue',
      name: 'AsyncUpdatedQueue',
      component: asyncupdatedqueue
    },
    {
      path: '/elementuitablesort',
      name: 'ElementUITableSort',
      component: elementuitablesort
    },
    {
      path: '/draganddrop',
      name: 'DragAndDrop',
      component: draganddrop
    },
    {
      path: '/rolling',
      name: 'Rolling',
      component: rolling
    },
    {
      path: '/draganddropad',
      name: 'DragAndDropAD',
      component: draganddropad
    },
    {
      path: '/echartgeomap',
      name: 'EchartGeoMap',
      component: echartgeomap
    }
  ]
})
