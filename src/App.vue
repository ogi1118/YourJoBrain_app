<!-- \src\App.vue -->
<template>
  <div id="app">
    <AppSidebar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppSidebar from './components/AppSidebar.vue'

export default {
  name: 'App',
  components: {
    AppSidebar
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  display: flex;
  height: 100vh; /* ビューポートの高さを100%に設定 */
  width: 100%; /* ビューポートの幅を100%に設定 */
}


.main-content {
  display: flex;
  flex-direction: column; /* 縦方向に配置 */
  align-items: center; /* 横方向に中央配置 */
  justify-content: flex-start; /* 上方向に詰めて配置 */
  padding: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  flex: 1;
}
</style>
