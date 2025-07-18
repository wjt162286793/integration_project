
<template>
  <div>
    <Header></Header>
    <div class="mainDom">
        <LeftMenu></LeftMenu>
         <router-view></router-view>
      </div>    
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue'
import LeftMenu from '@/components/LeftMenu.vue'
</script>

<style lang="less" scoped>
.mainDom{
  display: flex;
}
</style>