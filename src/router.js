import Vue from 'vue'
import Router from 'vue-router'
import SetupPage from './views/Setup'
import TextsPage from './views/Texts'
import ArchivePage from './views/Archive'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/setup',
      name: 'SetupPage',
      component: SetupPage
    },
    {
      path: '/texts',
      name: 'TextsPage',
      component: TextsPage
    },
    {
      path: '/archive',
      name: 'ArchivePage',
      component: ArchivePage
    },
    {
      path: '/writer',
      name: 'TypePage',
      component: () => import(/* webpackChunkName: "type" */ './views/Type')
    }
  ]
})
