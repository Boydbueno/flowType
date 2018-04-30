<template>
	<section>

    <h1>Setup</h1>
      <p slot="title">Time to type</p>
      
      <input type="radio" 
        v-for="(time, key) in availableTimes"
        name="time" 
        :label="time.milliseconds" 
        :key="key">
        {{ time.label }}
      </input>

      <router-link :to="{ name: 'TypePage'}">Go</router-link>
	</section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import settings from '@/settings'

export default {
  name: 'SetupPage',

  computed: {
    availableTimes: () => settings.availableTimes,
    ...mapState([
      'goalTime'
    ]),
    time: {
      get () {
        return this.$store.state.goalTime
      },
      set (value) {
        this.setGoalTime(value)
      }
    }
  },

  mounted () {
    this.showMenu()
  },

  methods: {
    ...mapMutations([
      'setGoalTime',
      'showMenu'
    ]),
    route (name) {
      this.$router.push(name)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>