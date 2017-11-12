<template>
  <div class="writer" @click="focus">
    <ft-progress class="goal-progress" :show="hasStarted" :progress="goalProgressBarWidth" />    

    <ft-progress class="erase-progress" :show="showEraseTimer" :progress="eraseProgressBarWidth" />

    <ft-button @ft-click="$router.push('/')">esc</ft-button>

    <ft-typer @ft-text-changed="onTextChanged" @ft-typer-mounted="onTyperMounted" :opacity="opacity" />
  </div>
</template>

<script>
import Timer from './../Timer.js'
import FtButton from '@/components/FtButton'
import FtProgress from '@/components/FtProgress'
import FtTyper from '@/components/FtTyper'

export default {
  name: 'TypePage',

  components: {
    'ft-button': FtButton,
    'ft-progress': FtProgress,
    'ft-typer': FtTyper
  },

  data () {
    return {
      typerRef: null,
      eraseMargin: 1000,

      eraseTimer: null,
      goalTimer: null,
      eraseProgress: 1,
      goalProgress: 1,
      showEraseTimer: false,
      hasStarted: false
    }
  },

  computed: {
    opacity () {
      if (this.eraseProgress === 1) return 1

      return this.showEraseTimer ? 1 - this.eraseProgress : 1
    },

    goalTime () {
      return this.$store.state.goalTime
    },

    eraseTime () {
      return this.$store.state.eraseTime
    },

    goalProgressBarWidth () {
      return 100 * this.goalProgress
    },

    eraseProgressBarWidth () {
      return 100 - 100 * this.eraseProgress
    }
  },

  created () {
    this.eraseTimer = new Timer()
    this.goalTimer = new Timer()
    // This timer should start when first letter is typed
    // It should stop when the page is made blank (by user or by eraser)
  },

  methods: {
    focus () {
      if (!this.typerRef) return

      this.typerRef.focus()
    },

    onTextChanged () {
      if (!this.hasStarted) {
        this.start()
      }

      // We can reset the timer here
      this.eraseTimer.reset()
      this.showEraseTimer = false
      // this.previousText = this.text
      this.$store.commit('updatePreviousText')
    },

    onTyperMounted (ref) {
      this.typerRef = ref
    },

    start () {
      this.hasStarted = true
      this.eraseProgress = 0

      if (this.hasStarted) {
        window.requestAnimationFrame(this.update)
      }
    },

    update (timestamp) {
      if (!this.eraseTimer.hasStarted) this.eraseTimer.start(timestamp)
      if (!this.goalTimer.hasStarted) this.goalTimer.start(timestamp)

      this.eraseTimer.update(timestamp)
      this.goalTimer.update(timestamp)

      if (this.eraseTimer.time >= this.eraseTime) {
        this.eraseTimer.time = this.eraseTime
        this.eraseProgress = 1
        this.stop()
      }

      if (this.eraseTimer.time >= this.eraseMargin) {
        this.goalTimer.pause()
        this.showEraseTimer = true
        this.eraseProgress = (this.eraseTimer.time - this.eraseMargin) / (this.eraseTime - this.eraseMargin)
      } else {
        this.goalTimer.resume()
        this.goalProgress = this.goalTimer.time / this.goalTime
      }

      if (this.goalTimer.time >= this.goalTime) {
        var pom = document.createElement('a')
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.$store.state.text))
        pom.setAttribute('download', 'text.txt')

        var event = document.createEvent('MouseEvents')
        event.initEvent('click', true, true)
        pom.dispatchEvent(event)
        this.stop()
      }

      if (this.hasStarted) {
        window.requestAnimationFrame(this.update)
      }
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
