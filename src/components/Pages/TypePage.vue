<template>
  <div class="writer" @click="focus">
    <ft-timer 
    ref="goalTimer" 
    :max="goalTime" 
    @ft-timer-max-reached="onGoalReached" 
    @on-mounted="onGoalTimerMounted" 
    />
    <ft-progress class="goal-progress" :show="hasStarted" :progress="goalProgressBarWidth" />

    <ft-timer 
    ref="eraseTimer" 
    :interval="[eraseMargin]" 
    :max="eraseTime + eraseMargin" 
    @ft-timer-interval-reached="onEraseIntervalReached" 
    @ft-timer-max-reached="onEraseReached"
    @on-mounted="onEraseTimerMounted"
    />
    <ft-progress class="erase-progress" :show="showEraseTimer" :progress="eraseProgressBarWidth" />

    <ft-button @ft-click="$router.push('/')">esc</ft-button>

    <ft-typer @ft-text-changed="onTextChanged" @ft-typer-mounted="onTyperMounted" :opacity="opacity" />
  </div>
</template>

<script>
import FtTimer from '@/components/FtTimer'
import FtButton from '@/components/FtButton'
import FtProgress from '@/components/FtProgress'
import FtTyper from '@/components/FtTyper'

import { mapState } from 'vuex'

export default {
  name: 'TypePage',

  components: {
    'ft-timer': FtTimer,
    'ft-button': FtButton,
    'ft-progress': FtProgress,
    'ft-typer': FtTyper
  },

  data () {
    return {
      typerRef: null,
      eraseMargin: 1000,

      isEraseTimerMounted: false,
      isGoalTimerMounted: false,

      showEraseTimer: false,
      hasStarted: false
    }
  },

  computed: {
    eraseTimer () {
      return this.isEraseTimerMounted ? this.$refs.eraseTimer : false
    },

    goalTimer () {
      return this.isGoalTimerMounted ? this.$refs.goalTimer : false
    },

    goalProgress () {
      if (!this.goalTimer) return 0

      return this.goalTimer.time / this.goalTime
    },

    eraseProgress () {
      if (!this.eraseTimer) return 0

      return (this.eraseTimer.time - this.eraseMargin) / (this.eraseTime - this.eraseMargin)
    },

    opacity () {
      if (this.eraseProgress === 1) return 1

      return this.showEraseTimer ? 1 - this.eraseProgress : 1
    },

    goalProgressBarWidth () {
      return 100 * this.goalProgress
    },

    eraseProgressBarWidth () {
      return 100 - 100 * this.eraseProgress
    },

    ...mapState([
      'goalTime',
      'eraseTime'
    ])
  },

  methods: {
    focus () {
      if (!this.typerRef) return

      this.typerRef.focus()
    },

    onTextChanged () {
      if (!this.hasStarted) {
        this.start()
      } else {
        this.eraseTimer.reset()
        this.goalTimer.resume()
        this.showEraseTimer = false
        this.$store.commit('updatePreviousText')
      }
    },

    onTyperMounted (ref) {
      this.typerRef = ref
    },

    onEraseTimerMounted () {
      this.isEraseTimerMounted = true
    },

    onGoalTimerMounted () {
      this.isGoalTimerMounted = true
    },

    onGoalReached () {
      this.fileDownload()
      this.stop()
    },

    onEraseIntervalReached (intervalTime) {
      this.goalTimer.pause()
      this.showEraseTimer = true
    },

    onEraseReached () {
      this.showEraseTimer = false
      this.stop()
    },

    start () {
      this.hasStarted = true

      this.goalTimer.start()
      this.eraseTimer.start()
    },

    fileDownload () {
      var pom = document.createElement('a')
      pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.$store.state.text))
      pom.setAttribute('download', 'text.txt')

      var event = document.createEvent('MouseEvents')
      event.initEvent('click', true, true)
      pom.dispatchEvent(event)
    },

    stop () {
      this.hasStarted = false
      this.eraseTimer.stop()
      this.goalTimer.stop()
      this.$store.commit('updateText', '')
      this.$store.commit('updatePreviousText')
    }
  }
}
</script>

<style lang="scss" scoped>
  .writer {
    background-color: #cecec4;
    cursor: text;
  }

  .goal-progress {
    background-color: green;
  }

  .erase-progress {
    background-color: red;
  }

  .fade-enter-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  .back {
    margin-top: 20px;
    padding-left: 20px;
  }
</style>
