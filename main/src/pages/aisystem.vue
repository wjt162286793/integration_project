<template>
  <div>
    <WujieVue
      name="aisystem"
      :url="url"
      :keep-alive="true"
      :sync="true"
      width="100%"
      height="100%"
      :alive="true"
      :props="wujieProps"
    ></WujieVue>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import WujieVue from "wujie-vue3";

const url = ref("http://82.157.193.128:8085");

const wujieProps = ref({
  fetch: (url: string, options: RequestInit) => {
    // 匹配子应用所有API请求
    if (url.includes('8085/aisystemApi')) {
      return window.fetch(
        url.replace('http://82.157.193.128:8085', '/aisystem-sub-api'),
        {
          ...options,
          credentials: 'include',
          headers: {
            ...options.headers,
            'Content-Type': 'application/json',
          },
        }
      );
    }
    return window.fetch(url, options);
  },
});
</script>

<style lang="less" scoped>
</style>