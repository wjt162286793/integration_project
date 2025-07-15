<template>
 <div class="main-container">
  <router-view></router-view>
    <!-- 主应用 
    <button @click="changeActiveItem(0)">切换到react应用</button>
    <button @click="changeActiveItem(1)">切换到vue应用</button>
    <hr>
    <div class="react-sub-container">
      <WujieVue  :name="activeItem.name" :url="activeItem.url" :sync="activeItem.sync" width="100%" :height="calcHeight"/>
    </div> -->
 </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'

interface listItem {
  name: string;
  url: string;
  sync:boolean;
}

const calcHeight = `calc(100vh - 200px)`

const list:Ref<listItem[]> = ref([
    {
      name: 'react-sub',
      url: 'http://localhost:9001',
      sync: true
    },
    {
      name: 'vue-sub',
      url: 'http://localhost:9002',
      sync: true
    }
])

const activeItem = ref<listItem>(
  {
      name: 'react-sub',
      url: 'http://localhost:9001',
      sync: true
  }
)

const changeActiveItem = (index)=>{
  activeItem.value = list.value[index]
}

</script>

<style scoped>

.main-container {
  padding: 20px;
}
.react-sub-container,
.vue-sub-container {
  
  margin-bottom: 20px;
  overflow: auto;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>