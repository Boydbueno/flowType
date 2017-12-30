<template>
  <div class="writer" @click="focus">
    <ft-timer 
      ref="goalTimer" 
      :max="goalTime" 
      @max-reached="onGoalReached" 
      @mounted="onGoalTimerMounted" 
    />
    <ft-progress class="goal-progress" :show="hasStarted" :progress="goalProgressBarWidth" />

    <ft-timer 
      ref="eraseTimer" 
      :interval="[eraseMargin]" 
      :max="eraseTime + eraseMargin" 
      @interval-reached="onEraseIntervalReached" 
      @max-reached="onEraseReached"
      @mounted="onEraseTimerMounted"
    />
    <ft-progress class="erase-progress" :show="showEraseTimer" :progress="eraseProgressBarWidth" />

    <ft-button @click="$router.push('/')">esc</ft-button>

    <ft-typer @text-changed="onTextChanged" @mounted="onTyperMounted" :opacity="opacity" />
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
    /**
     * The erase timer or false when it's not mounted
     * @return {FtTimer | boolean}
     */
    eraseTimer () {
      return this.isEraseTimerMounted ? this.$refs.eraseTimer : false
    },

    /**
     * The goal timer or false when it's not mounted
     * @return {FtTimer | boolean}
     */
    goalTimer () {
      return this.isGoalTimerMounted ? this.$refs.goalTimer : false
    },

    /**
     * Progress to goal based on the goal timer
     * @return {Number} Between 0 and 1
     */
    goalProgress () {
      if (!this.goalTimer) return 0

      return this.goalTimer.time / this.goalTime
    },

    /**
     * Progress to erasion based on the goal timer
     * @return {Number} Between 0 and 1
     */
    eraseProgress () {
      if (!this.eraseTimer) return 0

      return (this.eraseTimer.time - this.eraseMargin) / this.eraseTime
    },

    /**
     * The opacity for the text
     * @return {Number} Between 0 and 1
     */
    opacity () {
      if (this.eraseProgress === 1) return 1

      return this.showEraseTimer ? 1 - this.eraseProgress : 1
    },

    /**
     * Width of the progress bar in percentage
     * @return {Number} Width of progress bar in percentage
     */
    goalProgressBarWidth () {
      return 100 * this.goalProgress
    },

    /**
     * Width of the erase bar in percentage
     * @return {Number} Width of erase bar in percentage
     */
    eraseProgressBarWidth () {
      return 100 - 100 * this.eraseProgress
    },

    ...mapState([
      'goalTime',
      'eraseTime'
    ])
  },

  methods: {
    /**
     * Focus the text area to type in
     */
    focus () {
      if (!this.typerRef) return

      this.typerRef.focus()
    },

    /**
     * When text is changed
     */
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

    /**
     * When typer is mounted
     * @param  {HTMLTextAreaElement} ref
     */
    onTyperMounted (ref) {
      this.typerRef = ref
    },

    /**
     * When erase timer is mounted
     */
    onEraseTimerMounted () {
      this.isEraseTimerMounted = true
    },

    /**
     * When goal timer is mounted
     */
    onGoalTimerMounted () {
      this.isGoalTimerMounted = true
    },

    /**
     * When goal timer is mounted
     */
    onGoalReached () {
      this.saveText()
      this.stop()
    },

    /**
     * When an erase timer interval is reached
     * @param  {Number} intervalTime The interval time that is reached
     */
    onEraseIntervalReached (intervalTime) {
      this.goalTimer.pause()
      this.showEraseTimer = true
    },

    /**
     * When erase timer has been reached
     */
    onEraseReached () {
      this.showEraseTimer = false
      this.stop()
    },

    /**
     * Start the typing 'game'
     */
    start () {
      this.hasStarted = true

      this.goalTimer.start()
      this.eraseTimer.start()
    },

    saveText () {
      this.$store.commit('saveText', {
        timestamp: Date.now(),
        content: this.$store.state.text,
        trashed: false
      })
    },

    /**
     * Let browser download file with the text
     */
    fileDownload () {
      var pom = document.createElement('a')
      pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.$store.state.text))
      pom.setAttribute('download', 'text.txt')

      var event = document.createEvent('MouseEvents')
      event.initEvent('click', true, true)
      pom.dispatchEvent(event)
    },

    /**
     * Stop the 'game'
     */
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
