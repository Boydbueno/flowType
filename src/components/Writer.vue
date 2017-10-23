<template>
  <div class="writer" @click="focus">
    <transition name="fade">
      <div class="progress goal-progress" v-show="hasStarted" :style="{ width: 100 * this.goalProgress + '%' }"></div>
    </transition>

    <transition name="fade">
      <div class="progress erase-progress" v-show="showEraseTimer" :style="{ width: 100 - 100 * this.eraseProgress + '%' }"></div>
    </transition>

    <router-link class="back key" to="/"><span>esc</span></router-link>

    <textarea ref="textarea" autofocus @keyup="onKeyUp" v-model="text" :style="{ opacity: this.showEraseTimer ? 1 - this.eraseProgress : 1 }"></textarea>
  </div>
</template>

<script>
import Timer from './Timer.js'

export default {
  name: 'Writer',
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
      opacity: 1,
      hasStarted: false
    }
  },

  computed: {
    goalTime () {
      return this.$store.state.settings.goalTime
    },

    eraseTime () {
      return this.$store.state.settings.eraseTime
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

  .key {
    text-decoration: none;
    display: inline-block;
    width:35px;
    height: 37px;
  }

  .key > span {
    box-sizing: border-box;
    display: block;
    width: 35px;
    height: 35px;
    border: 1px solid #a9a9a9;
    border-radius: 2px;
    font-size: 12px;
    text-align: center;
    padding-top: 10px;
    background-color: rgba(255, 255, 255, 0.3);
    color: #7c7c7c;
    box-shadow: 0px 3px 0px -2px rgba(255,255,255,.8), 0px 2px 0px 0px rgba(169,169,169,1);
    cursor: pointer;
  }

  .key > span:active {
    margin-top: 2px;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }
</style>
