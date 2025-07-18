<template>
  <header class="header">
    <h1>
        Devops平台
    </h1>
  </header>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
</script>

<style lang="less" scoped>
.header{
    width: 100vw;
    height: 60px;
    background: #000;
    color: #fff;
    h1{
        width: 160px;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        margin-left: 20px;
        font-weight: 700;
    }
}
</style>