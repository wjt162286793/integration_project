
import Login from '@/pages/Login.vue'
import Portal from '@/pages/Portal.vue'

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

export default routes