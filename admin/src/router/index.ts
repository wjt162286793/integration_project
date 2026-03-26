import { createRouter, createWebHistory} from 'vue-router';

// 定义路由规则 - 使用懒加载方式导入组件
const routes = [
  {
    path: '/',
    redirect: '/login' // 默认重定向到登录页
  },
  {
    path: '/login',
    name: 'Login',
    // 懒加载登录组件
    component: () => import('../pages/login/index.vue'),
    meta: {
      title: '登录页面',
      requiresAuth: false // 不需要登录
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // 懒加载仪表盘组件
    component: () => import('../pages/dashboard/index.vue'),
    meta: {
      title: '仪表盘',
      requiresAuth: true // 需要登录
    },
    children: [
      {
        path: '/dashboard/appMode',
        name: 'AppMode',
        component: () => import('../pages/appMode/index.vue'),
        meta: { title: '应用管理' }
      },
      {
        path: '/dashboard/taskMode',
        name: 'TaskMode',
        component: () => import('../pages/taskMode/index.vue'),
        meta: { title: '任务管理' }
      },
      {
        path: '/dashboard/fileMode',
        name: 'FileMode',
        component: () => import('../pages/fileMode/index.vue'),
        meta: { title: '文件管理' }
      },
      {
        path: '/dashboard/pipelineMode',
        name: 'PipelineMode',
        component: () => import('../pages/pipelineMode/index.vue'),
        meta: { title: '流水线管理' }
      }
    ]
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;