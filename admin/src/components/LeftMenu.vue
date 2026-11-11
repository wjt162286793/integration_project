<template>
    <el-menu
    :collapse="false"
        active-text-color="#ffffff"
        background-color="#1d2b42"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <el-icon><icon-menu /></el-icon>
          <span>应用管理</span>
        </el-menu-item>
                <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>流水线管理</span>
        </el-menu-item>
                <el-menu-item index="3">
          <el-icon><icon-menu /></el-icon>
          <span>文件管理</span>
        </el-menu-item>
                <el-menu-item index="4">
          <el-icon><icon-menu /></el-icon>
          <span>任务管理</span>
        </el-menu-item>
      </el-menu>
</template>
<script lang="ts" setup>
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style lang="less" scoped>
.el-menu{
 height: calc(100vh - 60px);
 background: color-mix(in srgb, var(--app-primary) 58%, #111b2b) !important;
}

.el-menu-item.is-active {
  background: color-mix(in srgb, var(--app-primary) 78%, #111b2b) !important;
}

</style>
