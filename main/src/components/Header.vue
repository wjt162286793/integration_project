 
<template>
  <div class="header">
    <h1 class="logo"><img src="../assets/svg/lego.svg" alt="">集成平台</h1>
    <ul class="menu">
      <li v-for="(item) in list" :key="item.name" class="menu-item" @click="selectItem(item)">
        {{item.cname}}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref,defineEmits } from "vue";
import list from "@/app-config";
import {listItem} from '@/types/index'
const emit = defineEmits(['selectItem'])
const router = useRouter();

const selectItem = (item:listItem) => {
  emit('selectItem',item)
};

const logout = () => {
  router.push("/login");
};
</script>

<style lang="less" scoped>
.header{
    display: flex;
    .logo {
        width: 200px;
        height: 60px;
        background: #000;
        color: #fff;
        text-align: center;
        line-height: 60px;
        font-size: 24px;
        cursor: pointer;
        img{
          height: 36px;
          margin-right: 8px;
          margin-bottom: 8px;
        }
    }
    .menu{
        background: #000;
        flex: 1;
        border-left: 1px solid #fff;
        display: flex;
        .menu-item{
          background: #000;
          color: #fff;
          height: 60px;
          width: 120px;
          font-size: 18px;
          text-align: center;
          line-height: 60px;
          border-bottom: 1px solid #000;
          cursor: pointer;
        }
        .menu-item:hover{
          background: #fff;
          color: #000;
          box-sizing: border-box;
          
        }
    }
}


</style>