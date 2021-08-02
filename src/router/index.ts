import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import storage from '../utils/storage'
import api from '../api'
import util from '../utils/utils'

const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页'
    },
    component: Home,
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: {
          title: '欢迎体验Vue3管理后台'
        },
        component: () => import('@/views/Welcome.vue')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/Login.vue')
  },
  {
    name: '404',
    path: '/404',
    meta: {
      title: '页面不存在'
    },
    component: () => import('@/views/404.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

async function loadAsyncRoutes() {
  const userInfo = storage.getItem('userInfo') || {}
  if (userInfo.token) {
    const { menuList } = await api.getPermissionList()
    const routes = util.generateRoute(menuList)
    routes.forEach((route) => {
      const url = `./../views/${route.component}.vue`
      route.component = () => import(url)
      router.addRoute('home', route)
    })
  }
}

await loadAsyncRoutes()

// 判断当前地址是否可以访问
function checkPermission(path: string) {
  return router.getRoutes().filter((route) => route.path === path).length
}

// 导航守卫
router.beforeEach((to, from, next) => {
  if (checkPermission(to.path)) {
    // 把 meta 内 title 赋值为页面标题
    document.title = to.meta.title as string
    next()
  } else {
    next('/404')
  }
})

export default router
