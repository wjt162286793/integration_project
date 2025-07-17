<template>
  <div class="portal-container">
   <Header @selectItem="selectItem" :ruleList="ruleList"></Header>
   <div class="subApp-container">
    <WujieVue v-if="activeApp" :name="activeApp.name" :url="activeApp.url" :sync="activeApp.sync" width="100%" height="100%"></WujieVue>
   </div>
    
  </div>
</template>

<script setup lang="ts">
import {listItem} from '@/types/index'
import {userStore} from '@/store'
import Header from  '@/components/Header.vue'

import { useRouter,useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import list from "@/app-config";

import WujieVue from 'wujie-vue3'

const router = useRouter()
const route = useRoute()
const userInfo = userStore()
const activeAppName:Ref<string> = ref('chart')
const activeApp:Ref<listItem | null> = ref(null)

const ruleList = ref<listItem[]>([])


const getActiveApp = (name:string)=>{
  activeApp.value = list.find(item => item.name === name)
}

const selectItem = (item:listItem)=>{
  activeApp.value = item
}

const filterRuleList = ()=>{
  console.log(userInfo.user,'???===')
  let arr = []
  list.forEach(item=>{
    if(userInfo.user.appRuleList.includes(item.name)){
      arr.push(item)
    }
  })
  ruleList.value = arr
}

onMounted(()=>{

  filterRuleList()
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