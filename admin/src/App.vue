

<template>
  <div>
    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
const useWujieFlag = window?.__POWERED_BY_WUJIE__;
</script>

<style scoped>
/* 保留原有的样式 */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
