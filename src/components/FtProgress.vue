<template>
  <VProgressLinear
    v-show="show"
    height="3"
    class="progress"
    :color="color"
    :value="progress"
    background-color="transparent"
  />
</template>

<script>
import { VProgressLinear } from 'vuetify/lib'

export default {
  name: 'FtProgress',

  components: {
    VProgressLinear
  },

  props: {
    progress: {
      type: Number,
      default: 0
    },

    color: {
      type: String,
      default: 'success'
    },

    show: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
  .progress {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    opacity: 0.5;
  }
</style>
