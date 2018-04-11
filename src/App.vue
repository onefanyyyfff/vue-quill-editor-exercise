<template>
  <div id="app">
    <img class="reload-img" src="/static/img/load.gif" onclick="reloadPaper()" v-if="showGif">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      showGif:false
    }
  }
}
</script>

<style scoped>
#app {
  font-family: BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:100%;
  height:100%;
  letter-spacing: 1px;
}
</style>
