<template />

<script>
export default {
  name: 'FtTimer',

  props: {
    max: {
      type: Number,
      default: 0
    },
    interval: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      hasStarted: false,
      startTime: -1,
      currentTime: -1,

      isPaused: false,
      pausedStartTime: -1,
      pausedTime: 0,
      previousPausedTime: 0,

      intervalReached: 0
    }
  },

  computed: {
    /**
       * How long the timer has been running
       * @return {Number} Time in ms
       */
    time () {
      return Math.min(this.currentTime - this.startTime - this.pausedTime, this.max)
    }
  },

  mounted () {
    this.$emit('mounted')
  },

  methods: {
    /**
       * Start the timer
       */
    start () {
      this.hasStarted = true

      window.requestAnimationFrame(this.update)
    },

    /**
       * Update of the timer repeated on animation frame
       * @param  {Number} timestamp
       */
    update (timestamp) {
      if (!this.hasStarted) return

      if (this.startTime === -1) this.startTime = timestamp

      if (this.isPaused) {
        if (this.pausedStartTime === -1) this.pausedStartTime = timestamp

        this.pausedTime = timestamp - this.pausedStartTime + this.previousPausedTime
      }

      this.currentTime = timestamp

      if (this.interval.length > this.intervalReached) {
        if (this.time >= this.interval[this.intervalReached]) {
          this.$emit('interval-reached', this.interval[this.intervalReached])
          this.intervalReached++
        }
      }

      if (this.time >= this.max) {
        this.$emit('max-reached')
      }

      window.requestAnimationFrame(this.update)
    },

    /**
       * Stop the timer
       */
    stop () {
      this.hasStarted = false
      this.isPaused = false

      this.startTime = -1
      this.currentTime = -1

      this.pausedStartTime = -1
      this.pausedTime = 0
      this.previousPausedTime = 0

      this.intervalReached = 0
    },

    /**
       * Pause the timer
       */
    pause () {
      this.isPaused = true
    },

    /**
       * Resume the timer after pausing
       */
    resume () {
      if (!this.isPaused) return

      this.previousPausedTime = this.pausedTime
      this.pausedStartTime = -1
      this.isPaused = false
    },

    /**
       * Reset the timer
       */
    reset () {
      this.startTime = this.currentTime
    }

  }
}
</script>

<style
  lang="scss"
  scoped
>
</style>
