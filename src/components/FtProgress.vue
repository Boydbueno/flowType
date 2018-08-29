<template>
  <v-progress-linear
    height="3"
    v-show="show"
    class="progress"
    :color="color"
    :value="progress"
    background-color="transparent"
  ></v-progress-linear>
</template>

<script>
import { VProgressLinear } from 'vuetify'

export default {
  name: 'FtProgress',

  components: {
    VProgressLinear
  },

  props: {
    progress: {
      type: Number
    },

    color: {
      type: String,
      default: 'success'
    },

    show: {
      type: Boolean,
      default: false
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