<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',

  computed: {
    ...mapState([
      'texts'
    ])
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

body {
  margin: 0;
}

textarea {
  margin: 0;
  padding: 0;
}
</style>