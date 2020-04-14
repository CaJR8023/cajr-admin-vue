import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { Message } from 'element-ui'
import Layout from '@/layout'
import getTitle from '@/utils/getTitle'
Vue.use(Router)

/**
 * 路由相关属性说明
 * hidden: 当设置hidden为true时，意思不在sideBars侧边栏中显示
 * mete{
 * title: xxx,  设置sideBars侧边栏名称
 * icon: xxx,  设置ideBars侧边栏图标
 * noCache: true  当设置为true时不缓存该路由页面
 * }
 */

/*通用routers*/
export const currencyRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: { title: '登录页' },
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/dashbord',
    children: [
      {
        path: 'dashbord',
        name: 'Dashbord',
        component: () => import('@/views/dashboard'),
        meta: { title: '首页', icon: 'el-icon-s-data' }
      }
    ]
  }
]
export const asyncRoutes = [
  {
    path: '/driver',
    name: 'Driver',
    component: Layout,
    redirect: '/driver/index',
    children: [
      {
        path: 'index',
        name: 'Driver-index',
        component: () => import('@/views/driver-page'),
        meta: { title: '引导指南', icon: 'el-icon-s-flag' }
      }
    ]
  },
  {
    path: '/rec',
    name: 'RecTable',
    redirect: '/table/base-table',
    component: Layout,
    meta: {
      title: '推荐模块',
      icon: 'el-icon-table iconfont'
    },
    children: [
      {
        path: 'recommend_table',
        name: 'RecommendTable',
        component: () => import('@/views/recommend/recommend-table'),
        meta: { title: '推荐表格' }
      }
    ]
  },
  {
    path: '/news',
    name: 'NewsModuleTable',
    component: Layout,
    meta: {
      title: '新闻模块',
      icon: 'el-icon-table iconfont'
    },
    children: [
      {
        path: 'news_table',
        name: 'NewsTable',
        component: () => import('@/views/news/news-table'),
        meta: { title: '新闻表格' }
      },
      {
        path: 'news_log_table',
        name: 'NewsLogTable',
        component: () => import('@/views/news/news-log-table'),
        meta: { title: '新闻浏览记录表格' }
      },
      {
        path: 'news_img_table',
        name: 'NewsImgTable',
        component: () => import('@/views/news/news-image-table'),
        meta: { title: '新闻图片表格' }
      },
      {
        path: 'news_tag_table',
        name: 'NewsTagTable',
        component: () => import('@/views/news/news-tag-table'),
        meta: { title: '标签表格' }
      },
      {
        path: 'module_table',
        name: 'ModuleTable',
        component: () => import('@/views/news/module-table'),
        meta: { title: '新闻分类表格' }
      }
    ]
  },
  {
    path: '/user',
    name: 'UserTable',
    component: Layout,
    meta: {
      title: '用户模块',
      icon: 'el-icon-table iconfont'
    },
    children: [
      {
        path: 'user_table',
        name: 'UserTable',
        component: () => import('@/views/user/user-table'),
        meta: { title: '用户信息表格' }
      },
      {
        path: 'user_pref_table',
        name: 'UserPrefTable',
        component: () => import('@/views/user/user-pref-table'),
        meta: { title: '用户喜好词表格' }
      }
    ]
  },
  {
    path: '/column',
    name: 'ColumnTable',
    component: Layout,
    meta: {
      title: '专栏模块',
      icon: 'el-icon-table iconfont'
    },
    children: [
      {
        path: 'recommend_table',
        name: 'ColumnTable',
        component: () => import('@/views/column/column-table'),
        meta: { title: '专栏表格' }
      }
    ]
  }
]

const creatRouter = () => {
  return new Router({
    routes: currencyRoutes,
    scrollBehavior() {
      return { x: 0, y: 0 }
    }
  })
}

const router = creatRouter()

// 解决addRoute不能删除动态路由问题
export function resetRouter() {
  const reset = creatRouter()
  router.matcher = reset.matcher
}

// 导航守卫
router.beforeEach(async (to, from, next) => {
  document.title = getTitle(to.meta.title)
  if (to.path === '/login') {
    next()
  } else {
    if (store.getters.token) {
      const hasRoles = store.getters.roles.length > 0
      console.info('hasRoles =>' + hasRoles)
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch(
            'user/_getInfo',
            store.getters.userName
          )
          const addRoutes = await store.dispatch(
            'permission/getAsyncRoutes',
            roles
          )
          router.addRoutes(addRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          Message.error(error)
        }
      }
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
})
export default router
