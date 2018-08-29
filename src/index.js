// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import {
  Vuetify,
  VApp,
  VDivider,
  VBtn,
  VGrid,
  VIcon
} from 'vuetify'

import 'vuetify/src/stylus/app.styl'
// import 'vuetify/src/stylus/main.styl'
import 'vuetify/src/stylus/components/_input-groups.styl'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  components: {
    VApp,
    VDivider,
    VBtn,
    VGrid,
    VIcon
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
