<template>
  <textarea ref="textarea" autofocus @keyup="onKeyUp" v-model="text" :style="{ opacity: opacity }"></textarea>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'FtTyper',

    props: {
      opacity: {
        type: Number
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
      this.$emit('ft-typer-mounted', this.$refs.textarea)
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

        this.$emit('ft-text-changed')
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
    padding-top: 70px;
    padding: 15px;
    font-size: 45px;
    background-color: transparent;
    resize: none;

    &:focus {
      outline: 0;
    }
  }
</style>