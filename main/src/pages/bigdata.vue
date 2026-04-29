<template>
  <div>
    <WujieVue
      name="bigdata"
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
import list from "@/app-config";

const url = ref((list.find(item => item.name === 'bigdata')?.url) || "http://localhost:9003");
const appOrigin = url.value.replace(/\/+$/, '');

const wujieProps = ref({
  fetch: (url: string, options: RequestInit) => {
    // 拦截所有来自 bigdata 子应用的API请求
    if (url.startsWith(`${appOrigin}/bigdataApi`)) {
      return window.fetch(
        url.replace(appOrigin, "/bigdata-sub-api"),
        {
          ...options,
          credentials: "include",
          headers: {
            ...options.headers,
            "Content-Type": "application/json",
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
