import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import WujieVue from 'wujie-vue3'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import {createPinia} from 'pinia'
import './style.css'
import { initializeUiRuntime } from './ui-preferences'


const app = createApp(App)
app.use(ElementPlus)

app.use(createPinia())
app.use(router)
app.use(WujieVue)
initializeUiRuntime()
//应用无界
app.mount('#app')
