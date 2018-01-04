<template>
  <div>
    <i-button size="small" type="info" @click="onRestore">
      <i-icon size="20" type="ios-undo"></i-icon>
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
    onRestore () {
      this.$store.commit('restoreText', this.text)
      Message.info({
        render: h => {
          return h('span', [
            'The text ',
            h('small', this.text.content),
            ' has been restored. '
          ])
        },
        duration: 3
      })
    }
  }
}
</script>