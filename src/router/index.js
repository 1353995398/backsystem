import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import axios from 'axios'
import url from '@/config/url'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Login'
  },
  {
    path: '/Login',
    component: Login
  },
  {
    path: '/register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/admin.vue'),
    meta: {
      isLogin: true
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: {
          isLogin: true
        },
      },
      {
        path: 'goods',
        component: () => import('../views/Goods.vue'),
        meta: {
          isLogin: true
        },
      },
      {
        path: 'user',
        component: () => import('../views/User.vue'),
        meta: {
          isLogin: true
        },
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // 通过路由配置通过的meta路由元信息 判断是否拦截
  // 是否需要登录权限
  if (to.meta.isLogin) {
    if (!localStorage.getItem('token')) {
      alert('请先登录')
      next('/login')
    } else {
      axios.get(url.profile).then((res) => {
        if (res.data.code === 401) {
          alert('请先登录')
          next('/login')
        } else {
          localStorage.setItem('userInfo', JSON.stringify(res.data.data))
          next()
        }
      })
    }
  } else {
    next()
  }
})
export default router
