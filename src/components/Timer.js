export default class Timer {
  constructor () {
    this.hasStarted = false
    this.isPaused = false
    this.pausedStartTime = -1
    this.previousPausedTime = 0
    this.pausedTime = 0
    this.startTime = -1
    this.timestamp = -1
  }

  get time () {
    return this.timestamp - this.startTime - this.pausedTime
  }

  set time (time) {
    this.timestamp = this.startTime + time
  }

  start () {
    this.hasStarted = true
  }

  update (timestamp) {
    if (!this.hasStarted) return
    if (this.startTime === -1) this.startTime = timestamp

    if (this.isPaused) {
      if (this.pausedStartTime === -1) this.pausedStartTime = timestamp

      this.pausedTime = timestamp - this.pausedStartTime + this.previousPausedTime
    }

    this.timestamp = timestamp
  }

  reset () {
    this.startTime = this.timestamp
  }

  stop () {
    this.hasStarted = false
  }

  pause () {
    this.isPaused = true
  }

  resume () {
    if (!this.isPaused) return

    this.previousPausedTime += this.pausedTime
    this.pausedStartTime = -1
    this.isPaused = false
  }
}
