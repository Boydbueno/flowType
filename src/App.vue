<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from '@/store'

  export default {
    name: 'app',
    store
  }
</script>

<style>
html, 
body,
#app {
    height: 100%;
}

body {
  margin: 0;
}

textarea {
  margin: 0;
  padding: 0;
}
</style>