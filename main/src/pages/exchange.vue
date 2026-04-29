<template>
  <div>
    <WujieVue 
      name="exchange" 
      :url="url" 
      :props="wujieProps"
      :keep-alive="true" 
      :sync="true" 
      width="100%" 
      height="100%" 
      :alive="true"
    ></WujieVue>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import WujieVue from 'wujie-vue3'
import list from '@/app-config'

const url = ref((list.find(item => item.name === 'exchange')?.url) || 'http://localhost:9001')
const appOrigin = url.value.replace(/\/+$/, '')

const wujieProps = ref({
  fetch: (url: string, options: RequestInit) => {
    // 匹配子应用所有API请求
    if (url.startsWith(`${appOrigin}/exchangeApi`)) {
      return window.fetch(
        url.replace(appOrigin, '/exchange-sub-api'),
        { 
          ...options, 
          credentials: 'include',
          headers: {
            ...options.headers,
            'Content-Type': 'application/json'
          }
        }
      )
    }
    return window.fetch(url, options)
  }
})
</script>
