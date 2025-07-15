import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'
import WujieVue from 'wujie-vue3'
import './style.less'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(ElementPlus)


app.use(router)
app.use(WujieVue)
//应用无界
app.mount('#app')