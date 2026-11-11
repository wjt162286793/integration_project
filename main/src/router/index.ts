
import { createRouter, createWebHistory } from 'vue-router'
import { reqUserInfoApi } from '@/api'
import { userStore } from '@/store'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/',
    component: () => import('@/pages/Portal.vue'),
    redirect: { name: 'console' },
    children: [
      {
        path: 'console',
        name: 'console',
        component: () => import('@/pages/Console.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/pages/Settings.vue'),
      },
      {
        path: 'exchange',
        name: 'exchange',
        component: () => import('@/pages/exchange.vue'),
      },
      {
        path: 'bigdata',
        name: 'bigdata',
        component: () => import('@/pages/bigdata.vue'),
      },
      {
        path: 'aisystem',
        name: 'aisystem',
        component: () => import('@/pages/aisystem.vue'),
      },
      {
        path: 'devops',
        name: 'devops',
        component: () => import('@/pages/devops.vue'),
      },
    ],
  },
  {
    path: '/portal',
    redirect: { name: 'console' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'console' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

let userInfoLoaded = false

const loadUserInfo = async (): Promise<boolean> => {
  try {
    const response = await reqUserInfoApi()
    if (response.code !== 200) return false
    userStore().setUser(response.data)
    userInfoLoaded = true
    return true
  } catch {
    return false
  }
}

router.beforeEach(async (to) => {
  const token = localStorage.getItem('intergration_token')

  if (to.name === 'login') {
    if (!token) return true
    if (userInfoLoaded || await loadUserInfo()) return { name: 'console' }
    localStorage.removeItem('intergration_token')
    return true
  }

  if (!token) return { name: 'login' }
  if (userInfoLoaded) return true

  if (await loadUserInfo()) return true

  localStorage.removeItem('intergration_token')
  return { name: 'login' }
})

export default router
