import Vue from 'vue'
import Router from 'vue-router'
import SetupPage from '@/components/Pages/SetupPage'
import TypePage from '@/components/Pages/TypePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SetupPage',
      component: SetupPage
    },
    {
      path: '/writer',
      name: 'TypePage',
      component: TypePage
    }
  ]
})
