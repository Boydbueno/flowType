<template>
  <div>
    <i-button size="small" type="primary" @click="onRestore">
      <i-icon size="20" type="ios-undo"></i-icon>
    </i-button>

    <i-button size="small" type="error" @click="confirmationWindow = true">
      <i-icon size="20" type="close-round"></i-icon>
    </i-button>

    <i-modal
        v-model="confirmationWindow"
        title="Common Modal dialog box title">
        <p slot="header" style="color:#f60;text-align:center">
          <i-icon type="information-circled"></i-icon>
          <span>Delete confirmation</span>
        </p>
        <div slot="footer">
          <i-button type="error" size="large" long @click="onDelete">Delete</i-button>
        </div>
        <p>Are you sure you want to permanently delete '{{ text.content }}'</p>
    </i-modal>
  </div>
</template>

<script>
import { Button, Icon, Message, Modal } from 'iview'

export default {
  name: 'TextsActions',

  props: {
    text: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      confirmationWindow: false
    }
  },

  components: {
    'i-button': Button,
    'i-modal': Modal,
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
    },

    onDelete () {
      this.$store.commit('removeText', this.text)
    }
  }
}
</script>