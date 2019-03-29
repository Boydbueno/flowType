<template>
  <v-app id="app">
    <FtNavigationDrawer :open="showMenu" />

    <v-toolbar
      app
      fixed
      clipped-left
      color="primary"
    >
      <v-toolbar-side-icon
        v-show="toolbar.action.type === 'menu'"
        @click.stop="showMenu = !showMenu"
      />
      <router-link :to="{name: toolbar.action.location}">
        <v-btn
          v-show="toolbar.action.type === 'back'"
          icon
          dark
        >
          <VIcon color="grey lighten-2">
            arrow_back
          </VIcon>
        </v-btn>
      </router-link>
    </v-toolbar>

    <v-content>
      <v-container
        fluid
        fill-height
        class="container"
      >
        <v-layout>
          <v-flex xs12>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import { mapState } from 'vuex'
import * as VList from 'vuetify/lib/components/VList'
import * as VToolbar from 'vuetify/lib/components/VToolbar'
import * as VCard from 'vuetify/lib/components/VCard'
import FtNavigationDrawer from './components/FtNavigationDrawer'
import {
  VIcon
} from 'vuetify/lib'

export default {
  name: 'App',

  components: {
    ...VList,
    ...VToolbar,
    ...VCard,
    FtNavigationDrawer,
    VIcon
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
  },

  methods: {
    route (name) {
      this.$router.push(name)
    }
  }
}
</script>

<style>
    .container {
        position: relative;
    }
</style>
