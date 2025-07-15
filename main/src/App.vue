

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(()=>{

})
</script>

<style scoped>
.app-container {
  height: 100vh;
  width: 100vw;
  margin: 0px !important;
  padding: 0px !important;
}
</style>


