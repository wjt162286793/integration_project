
import { createRouter, createWebHistory } from 'vue-router'


import { reqUserInfoApi } from '@/api'
import { userStore } from '@/store'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login.vue')
  },
  {
    path: '/portal',
    name: 'portal',
    component: () => import('@/pages/Portal.vue'),
    children:[
      {
        path: '/exchange',
        name: 'exchange',
        component: () => import('@/pages/exchange.vue')
      },
      {
        path: '/bigdata',
        name: 'bigdata',
        component: () => import('@/pages/bigdata.vue')
      },
      {
        path: '/aisystem',
        name: 'aisystem',
        component: () => import('@/pages/aisystem.vue')
      }
    ]
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


const TOKEN_KEY = 'intergration_token'

const reqUserInfoHandler = async (next:any, redirectPath?:string) => {
  try {
    const res = await reqUserInfoApi()
    const userInfo = userStore()
    userInfo.setUser(res.data)
    if (redirectPath) {
      next(redirectPath)
    } else {
      next()
    }
  } catch (error) {
    localStorage.removeItem(TOKEN_KEY)
    next('/login')
  }
}

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const needAuth = to.path !== '/login'
  if (to.path === '/login') {
    if (token) {
      reqUserInfoHandler(next, '/portal')
    } else {
      next()
    }
    return
  }

  if (!needAuth) {
    next()
    return
  }

  if (!token) {
    next('/login')
    return
  }

  reqUserInfoHandler(next)
})

export default router
