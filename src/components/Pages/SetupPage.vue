<template>
	<section class="setup">
    
    <div class="container">

      <section class="goal-select cf">
        <h1>Pick Goal</h1>
        <div class="options cf">
          <ft-button 
            v-for="(time, key) in availableTimes" 
            :is-active="goalTime == time.milliseconds" 
            @ft-click="setGoalTime(time.milliseconds)"
            :key="key"
          >
            {{ time.label }}
          </ft-button>

          <div class="cf"></div>
        </div>
      </section>

      <section>
        <ft-button type="confirm" @ft-click="$router.push('writer')">Go</ft-button>
      </section>

    </div>

	</section>
</template>

<script>
import FtButton from '@/components/FtButton'

export default {
  name: 'Setup',

  components: {
    'ft-button': FtButton
  },

  data () {
    return {
    }
  },

  computed: {
    goalTime () {
      return this.$store.state.goalTime
    },

    availableTimes () {
      return this.$store.state.settings.availableTimes
    }
  },

  created () {
  },

  methods: {
    isGoalTime (time) {
      return this.goalTime === time
    },

    updateGoalTime (e) {
      this.$store.commit('updateGoalTime', e.target.value)
    },

    setGoalTime (time) {
      this.$store.commit('updateGoalTime', time)
    }
  }
}
</script>

<style lang="scss" scoped>
  .setup {
    height: 100%;
    margin: 0 auto;
    background-color: #cecec4;
  }

  .container {
    width: 1000px;
    margin: 0 auto;
  }

  .goal-select { 
    padding-top: 50px;
  }

  .cf {
    clear: both;
  }

  h1 {
    margin-top: 0;
    margin-left: 15px;
  }

  .continue {
    margin-top: 15px;
    margin-left: 15px;
  }
</style>