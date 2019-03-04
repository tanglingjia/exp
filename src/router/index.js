import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/AsyncUpdatedQueue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/asyncupdatedqueue',
      name: 'AsyncUpdatedQueue',
      component: HelloWorld
    }
  ]
})
