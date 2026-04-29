<template>
  <div class="portal-container">
    <Header @selectItem="selectItem" :ruleList="ruleList"></Header>
    <div class="subApp-container">
      <!-- <keep-alive include="ComponentA,ComponentB" :max="10"> -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { listItem } from "@/types/index";
import { userStore } from "@/store";
import Header from "@/components/Header.vue";

import { useRouter, useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import list from "@/app-config";

const router = useRouter();
const userInfo = userStore();

const ruleList = ref<listItem[]>([]);

const selectItem = (item: listItem) => {
  router.push({
    name: item.name,
  });
};

const filterRuleList = () => {
  const appRuleList = Array.isArray(userInfo.user?.appRuleList) ? userInfo.user.appRuleList : []
  if (!appRuleList.length) {
    ruleList.value = list
    return
  }
  ruleList.value = list.filter(item => appRuleList.includes(item.name))
};

onMounted(() => {
  filterRuleList()
});
</script>

<style lang="less" scoped>
.portal-container {
}
.logo {
}
.subApp-container {
  width: 100vw;
  height: calc(100vh - 60px);
}
</style>
