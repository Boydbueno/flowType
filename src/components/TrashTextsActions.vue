<template>
  <div>
    <span @click="onRestore">RESTORE</span>
    <span @click="onDelete">DELETE</span>
  </div>
</template>

<script>

export default {
  name: 'TextsActions',

  methods: {
    onRestore () {
      this.$store.commit('restoreText', this.text)
    },

    onDelete () {
      this.$store.commit('removeText', this.text)
    }
  }
}
</script>