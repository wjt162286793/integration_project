
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Portal from '@/pages/Portal.vue'

import { reqUserInfoApi } from '@/api'
import { userStore } from '@/store'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/portal',
    name: 'Portal',
    component: Portal
  },
  {
    path: '/',
    redirect: '/login' // 默认重定向到登录页
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})


const reqUserInfoHandler = (next,redirectPath)=>{

  reqUserInfoApi().then(res => {
    const userInfo = userStore()
    userInfo.setUser(res.data)
    if(redirectPath){
       next(redirectPath)
    }else{
      next()
    }
    
  })
}

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('intergration_token');

  // 已存在token，重定向到portal
  if (to.path === '/login') {
    if (token) {
        reqUserInfoHandler(next,'/portal')
    } else {
      next();
    }
  }
  // 不存在token，重定向到login
  else if (to.path === '/portal') {
    if (token) {
          reqUserInfoHandler(next,false)
    } else {
      next('/login');
    }
  }
  // 其他页面放行
  else {
    next();
  }
})

export default router