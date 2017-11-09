<template>
  <div class="writer" @click="focus">
    <transition name="fade">
      <div class="progress goal-progress" v-show="hasStarted" :style="{ width: this.goalProgressBarWidth + '%' }"></div>
    </transition>

    <transition name="fade">
      <div class="progress erase-progress" v-show="showEraseTimer" :style="{ width: this.eraseProgressBarWidth + '%' }"></div>
    </transition>

    <ft-button @ft-click="$router.push('/')">esc</ft-button>

    <textarea ref="textarea" autofocus @keyup="onKeyUp" v-model="text" :style="{ opacity: this.opacity }"></textarea>
  </div>
</template>

<script>
import Timer from './../Timer.js'
import FtButton from '@/components/FtButton'

export default {
  name: 'Writer',

  components: {
    'ft-button': FtButton
  },

  data () {
    return {
      eraseMargin: 1000,

      eraseTimer: null,
      goalTimer: null,
      text: '',
      previousText: '',
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
      this.$refs.textarea.focus()
    },

    onKeyUp (e) {
      // When there was no new input given
      if (this.previousText === this.text) {
        return
      }

      if (this.text === '') {
        return
      }

      if (!this.hasStarted) {
        this.start()
      }

      // We can reset the timer here
      this.eraseTimer.reset()
      this.showEraseTimer = false

      this.previousText = this.text
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
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.text))
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
      this.previousText = ''
      this.eraseTimer.stop()
      this.goalTimer.stop()
      this.text = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .writer {
    background-color: #cecec4;
    cursor: text;
  }

  .progress {
    z-index: 10;
    position: absolute;
    height: 1px;
    opacity: 0.5;
  }

  .goal-progress {
    background-color: green;
    width: 100%;
    height: 2px;
  }

  .erase-progress {
    background-color: red;
  }

  textarea {
    box-sizing: border-box;
    display: block;
    resize: none;
    border: 0;
    width: 1200px;
    height: 100vh;

    &:focus {
      outline: 0;
    }

    padding-top: 70px;
    margin: 0 auto;
    padding: 15px;
    font-size: 45px;

    background-color: transparent;
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
