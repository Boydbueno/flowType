<template>
  <div>
    <i-button size="small" type="primary" @click="onDownload">
      <i-icon size="20" type="ios-download-outline"></i-icon>
    </i-button>

    <i-button size="small" type="error" @click="onRemove">
      <i-icon size="20" type="trash-a"></i-icon>
    </i-button>
  </div>
</template>

<script>
import { Button, Icon, Message } from 'iview'

export default {
  name: 'TextsActions',

  props: {
    text: {
      type: Object,
      required: true
    }
  },

  components: {
    'i-button': Button,
    'i-icon': Icon
  },

  methods: {
    onDownload () {
      this.fileDownload(this.text.content)
    },

    onRemove () {
      this.$store.commit('trashText', this.text)
      let msg = Message.info({
        render: h => {
          return h('span', [
            'The text ',
            h('small', this.text.content),
            ' has been archived. ',
            h('a', {
              on: {
                click: () => {
                  msg()
                  this.$store.commit('untrashText', this.text)
                }
              }
            }, 'undo')
          ])
        },
        duration: 10
      })
    },

    /**
     * Let browser download file with the text
     */
    fileDownload (text) {
      var pom = document.createElement('a')
      pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
      pom.setAttribute('download', 'text.txt')

      var event = document.createEvent('MouseEvents')
      event.initEvent('click', true, true)
      pom.dispatchEvent(event)
    }
  }
}
</script>