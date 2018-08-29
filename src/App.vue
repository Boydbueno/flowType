<template>
  <v-app id="app">

    <ft-navigation-drawer :open="showMenu"></ft-navigation-drawer>

    <v-toolbar app fixed clipped-left color="primary">
      <v-toolbar-side-icon v-show="toolbar.action.type === 'menu'" @click.stop="showMenu = !showMenu"></v-toolbar-side-icon>
      <router-link :to="{ name: toolbar.action.location}">
        <v-btn icon dark v-show="toolbar.action.type === 'back'">
          <v-icon color="grey lighten-2">arrow_back</v-icon>
        </v-btn>
      </router-link>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height class="container">
        <v-layout>
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import { mapState } from 'vuex'
import * as VList from 'vuetify/es5/components/VList'
import * as VToolbar from 'vuetify/es5/components/VToolbar'
import * as VCard from 'vuetify/es5/components/VCard'
import FtNavigationDrawer from '@/components/FtNavigationDrawer'
import {
  VIcon,
  VSlider
} from 'vuetify'

export default {
  name: 'app',

  components: {
    ...VList,
    ...VToolbar,
    ...VCard,
    FtNavigationDrawer,
    VIcon,
    VSlider
  },

  computed: {
    ...mapState([
      'texts',
      'showMenu',
      'toolbar'
    ]),
    showMenu: {
      get () {
        return this.$store.state.showMenu
      },
      set (value) {
        this.$store.commit('setMenuState', value)
      }
    }
  },

  methods: {
    route (name) {
      this.$router.push(name)
    }
  },

  watch: {
    texts: {
      handler (newTexts) {
        localStorage.setItem('texts', JSON.stringify(this.texts))
      },
      deep: true
    }
  },

  beforeCreate () {
    let texts = localStorage.getItem('texts')
    if (!texts) return

    this.$store.commit('setTexts', JSON.parse(texts))
  }
}
</script>

<style>
.container {
  position: relative;
}

</style>