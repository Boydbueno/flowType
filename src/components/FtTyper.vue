<template>
  <textarea ref="textarea" autofocus @keyup="onKeyUp" v-model="text" :style="{ opacity: opacity }"></textarea>
</template>

<script>
  export default {
    name: 'FtTyper',

    props: [
      'opacity'
    ],

    computed: {
      text: {
        get () {
          return this.$store.state.text
        },
        set (value) {
          this.$store.commit('updateText', value)
        }
      }
    },

    data () {
      return {
      }
    },

    mounted () {
      this.$emit('ft-typer-mounted', this.$refs.textarea)
    },

    methods: {
      onKeyUp () {
        // When there was no new input given
        if (this.$store.state.previousText === this.text) {
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
</style>