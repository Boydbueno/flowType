<template>
	<section class="setup">
    
    <div class="container">

      <ft-button @click="$router.push('texts')">Texts</ft-button>

      <section class="goal-select cf">
        <h1>Pick Goal</h1>
        <div class="options cf">
          <ft-button 
            v-for="(time, key) in availableTimes" 
            :is-active="goalTime === time.milliseconds" 
            @click="setGoalTime(time.milliseconds)"
            :key="key"
          >
            {{ time.label }}
          </ft-button>

          <div class="cf"></div>
        </div>
      </section>

      <section>
        <ft-button type="confirm" @click="$router.push('writer')">Go</ft-button>
      </section>

    </div>

	</section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import FtButton from '@/components/FtButton'
import settings from '@/settings'

export default {
  name: 'SetupPage',

  components: {
    'ft-button': FtButton
  },

  computed: {
    availableTimes: () => settings.availableTimes,
    ...mapState([
      'goalTime'
    ])
  },

  methods: {
    ...mapMutations([
      'setGoalTime'
    ])
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