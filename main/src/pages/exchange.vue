<template>
  <div class="micro-app-host">
    <WujieVue 
      name="exchange" 
      :url="url" 
      :props="wujieProps"
      :keep-alive="true" 
      :sync="false"
      width="100%" 
      height="100%" 
      :alive="true"
    ></WujieVue>
  </div>
</template>

<script lang="ts" setup>
import WujieVue from 'wujie-vue3'
import { createUiBridgeProps } from '@/ui-preferences'
import { registerSubAppNavigation } from '@/subapp-navigation'

const url = 'http://localhost:9001'

const wujieProps = createUiBridgeProps({
  registerSubAppNavigation,
  fetch: (url: string, options: RequestInit) => {
    return window.fetch(url, options)
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
