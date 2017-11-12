<template>
  <transition name="fade">
    <div class="progress" v-show="show" :style="{ width: progress + '%' }"></div>
  </transition>
</template>

<script>
  export default {
    name: 'FtProgress',

    props: [
      'progress',
      'show'
    ],

    data () {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .progress {
    z-index: 10;
    position: absolute;
    height: 1px;
    opacity: 0.5;
  }

  .fade-enter-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>