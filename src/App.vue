<template>
  <div id="app">

    <i-menu v-if="showMenu" class="menu" mode="horizontal" @on-select="route" active-name="/">
      <i-menu-item name="/">
        Setup
      </i-menu-item>
      <i-menu-item name="texts">
        Texts
      </i-menu-item>
    </i-menu>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { Menu, MenuItem } from 'iview'

export default {
  name: 'app',

  components: {
    'i-menu': Menu,
    'i-menu-item': MenuItem
  },

  computed: {
    ...mapState([
      'texts',
      'showMenu'
    ])
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
html, 
body,
#app {
  height: 100%;
}

.menu {
  margin-bottom: 10px;
}
</style>