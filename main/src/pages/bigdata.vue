<template>
  <div class="micro-app-host">
    <WujieVue
      name="bigdata"
      :url="url"
      :keep-alive="true"
      :sync="false"
      width="100%"
      height="100%"
      :alive="true"
      :props="wujieProps"
    ></WujieVue>
  </div>
</template>

<script lang="ts" setup>
import WujieVue from 'wujie-vue3'
import { createUiBridgeProps } from '@/ui-preferences'

const url = 'http://localhost:9003'

const wujieProps = createUiBridgeProps({
  fetch: (url: string, options: RequestInit) => {
    return window.fetch(url, options);
  },
})
</script>

<style lang="less" scoped>
.micro-app-host {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
