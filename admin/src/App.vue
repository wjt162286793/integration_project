

<template>
  <div>
     {{useWujieFlag?'vue子应用使用无界':'vue子应用没有使用无界'}}
  </div>
</template>

<script setup lang="ts">
 const useWujieFlag = window?.__POWERED_BY_WUJIE__;
</script>

<style scoped>
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
