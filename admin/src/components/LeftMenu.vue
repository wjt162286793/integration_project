<template>
    <el-menu
    :collapse="false"
        active-text-color="#ffd04b"
        background-color="#545c64"
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
  Document,
  Menu as IconMenu,
  Location,
  Setting,
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
 background: #545c64 !important;
}

</style>