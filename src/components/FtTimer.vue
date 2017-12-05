<template>
</template>

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
      time () {
        return Math.min(this.currentTime - this.startTime - this.pausedTime, this.max)
      }
    },

    mounted () {
      this.$emit('mounted')
    },

    methods: {
      start () {
        this.hasStarted = true

        window.requestAnimationFrame(this.update)
      },

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

      pause () {
        this.isPaused = true
      },

      resume () {
        if (!this.isPaused) return

        this.previousPausedTime = this.pausedTime
        this.pausedStartTime = -1
        this.isPaused = false
      },

      reset () {
        this.startTime = this.currentTime
      }

    }
  }
</script>

<style lang="scss" scoped>
</style>