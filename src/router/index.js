import Vue from 'vue'
import Router from 'vue-router'
import Setup from '@/components/Setup'
import Writer from '@/components/Writer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Setup',
      component: Setup
    },
    {
      path: '/writer',
      name: 'Writer',
      component: Writer
    }
  ]
})
