<template>
  <div>
   <WujieVue  name="bigdata" :url="url" :keep-alive="true" :sync="true" width="100%" height="100%" :alive="true"></WujieVue>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import WujieVue from 'wujie-vue3'

const url = ref('http://localhost:9003/')
</script>

<style lang="less" scoped>

</style>