<template>
  <div id="app">

    <nav>
      <router-link :to="{ name: 'SetupPage'}">Setup</router-link>
      <router-link :to="{ name: 'TextsPage'}">Texts</router-link>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',

  components: {
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

</style>