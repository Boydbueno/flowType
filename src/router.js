import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/setup',
      name: 'SetupPage',
      component: () => import(/* webpackChunkName: "setup" */ './views/Setup')
    },
    {
      path: '/texts',
      name: 'TextsPage',
      component: () => import(/* webpackChunkName: "texts" */ './views/Texts')
    },
    {
      path: '/archive',
      name: 'ArchivePage',
      component: () => import(/* webpackChunkName: "archive" */ './views/Archive')
    },
    {
      path: '/writer',
      name: 'TypePage',
      component: () => import(/* webpackChunkName: "writer" */ './views/Type')
    }
  ]
})
