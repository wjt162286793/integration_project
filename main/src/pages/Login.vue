<template>
  <div class="loginBox">
   <el-button @click="login" type="primary">登录</el-button>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const login = () => {
    router.push('/portal')

}
</script>

<style lang="less" scoped>
.loginBox{
  display: flex;
}
</style>