<template>
  <div class="micro-app-host">
    <WujieVue
      name="devops"
      :url="url"
      :keep-alive="true"
      :sync="false"
      width="100%"
      height="100%"
      :alive="true"
      :props="wujieProps"
    />
  </div>
</template>

<script setup lang="ts">
import WujieVue from 'wujie-vue3'
import { createUiBridgeProps } from '@/ui-preferences'

const url = 'http://localhost:9002'
const wujieProps = createUiBridgeProps({})
</script>

<style lang="less" scoped>
.micro-app-host {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
