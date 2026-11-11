

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
  width: 100%;
  min-height: 100vh;
  margin: 0 !important;
  padding: 0 !important;
}
</style>


