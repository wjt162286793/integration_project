<template>
  <div class="portal-container">
   <Header @selectItem="selectItem"></Header>
   <div class="subApp-container">
    <WujieVue v-if="activeApp" :name="activeApp.name" :url="activeApp.url" :sync="activeApp.sync" width="100%" height="100%"></WujieVue>
   </div>
    
  </div>
</template>

<script setup lang="ts">
import {listItem} from '@/types/index'

import Header from  '@/components/Header.vue'

import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import list from "@/app-config";

import WujieVue from 'wujie-vue3'

const router = useRouter()

const activeAppName:Ref<string> = ref('chart')
const activeApp:Ref<listItem | null> = ref(null)


const getActiveApp = (name:string)=>{
  activeApp.value = list.find(item => item.name === name)
}

const selectItem = (item:listItem)=>{
  activeApp.value = item
}

onMounted(()=>{
  getActiveApp(activeAppName.value)
})




</script>

<style lang="less" scoped>
.portal-container{

}
  .logo{

  }
  .subApp-container{
    width: 100vw;
    height: calc(100vh - 60px);
  }
</style>