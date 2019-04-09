<template>
  <textarea
    ref="textarea"
    v-model="text"
    autofocus
    :style="{opacity}"
    @keyup="onKeyUp"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FtTyper',

  props: {
    opacity: {
      type: Number,
      default: 0
    }
  },

  computed: {
    ...mapState([
      'previousText'
    ]),
    text: {
      get () {
        return this.$store.state.text
      },
      set (value) {
        this.$store.commit('updateText', value)
      }
    }
  },

  mounted () {
    this.$emit('mounted', this.$refs.textarea)
  },

  destroyed () {
    this.text = ''
  },

  methods: {
    onKeyUp () {
      // When there was no new input given
      if (this.previousText === this.text) {
        return
      }

      if (this.text === '') {
        return
      }

      this.$emit('text-changed')
    }
  }
}
</script>

<style lang="scss" scoped>
  textarea {
    box-sizing: border-box;
    display: block;
    width: 1200px;
    height: 100vh;
    border: 0;
    margin: 0 auto;
    padding: 70px 15px 15px;
    font-size: 45px;
    background-color: transparent;
    resize: none;

    &:focus {
      outline: 0;
    }
  }
</style>
