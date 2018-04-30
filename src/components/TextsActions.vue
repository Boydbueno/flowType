<template>
  <div>
    <span @click="onDownload">DOWNLOAD</span>
    <span @click="onRemove">TRASH</span>
  </div>
</template>

<script>

export default {
  name: 'TextsActions',

  methods: {
    onDownload () {
      this.fileDownload(this.text.content)
    },

    onRemove () {
      this.$store.commit('trashText', this.text)
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