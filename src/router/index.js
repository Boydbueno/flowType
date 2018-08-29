import Vue from 'vue'
import Router from 'vue-router'
import SetupPage from '@/components/Pages/SetupPage'
import TextsPage from '@/components/Pages/TextsPage'
import TypePage from '@/components/Pages/TypePage'
import ArchivePage from '@/components/Pages/ArchivePage'

Vue.use(Router)

export default new Router({
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
      component: TypePage
    }
  ]
})
