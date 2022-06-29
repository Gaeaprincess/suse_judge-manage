import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
// import excelRouter from './modules/excel'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: false,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '控制台', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/a-MyViews/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '管理员/用户管理', // 设置该路由在侧边栏和面包屑中展示的名字
      icon: 'user',
      roles: ['admin', 'userManager', 'adminManager'] // you can set roles in root nav
    },
    children: [
      {
        path: 'directive',
        component: () => import('@/views/a-MyViews/user/userList/index'),
        name: 'DirectivePermission',
        meta: {
          title: '用户管理',
          roles: ['admin', 'userManager']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/a-MyViews/user/adminRole/index'),
        name: 'RolePermission',
        meta: {
          title: '管理员管理',
          roles: ['admin', 'adminManager']
        }
      }
    ]
  },
  {
    path: '/contest',
    component: Layout,
    redirect: '/contest/page',
    alwaysShow: true, // will always show the root menu
    name: 'Contest',
    meta: {
      title: '竞赛',
      icon: 'chart',
      noCache: true,
      roles: ['admin', 'userAdmin', 'test', 'superadmin']
    },
    children: [
      {
        path: 'manage',
        component: () => import('@/views/a-MyViews/contest/manage'),
        name: 'Icons',
        meta: { title: '竞赛管理', noCache: true, roles: ['admin', 'userAdmin', 'test', 'superadmin'] }
      },
      // {
      //   path: 'problem',
      //   component: () => import('@/views/a-MyViews/contest/problem'),
      //   name: 'Icons',
      //   meta: { title: '题目管理', noCache: true, roles: ['admin', 'userAdmin', 'test', 'superadmin'] }
      // },
      {
        path: 'integral',
        component: () => import('@/views/a-MyViews/contest/integral'),
        name: 'Icons',
        meta: { title: '积分管理', noCache: true, roles: ['admin', 'userAdmin', 'test', 'superadmin'] }
      },
      {
        path: 'create',
        component: () => import('@/views/a-MyViews/contest/create'),
        name: 'Icons',
        meta: { title: '发布竞赛', noCache: true, roles: ['admin', 'userAdmin', 'test', 'superadmin'] }
      },
      {
        path: 'answer',
        component: () => import('@/views/a-MyViews/contest/answer'),
        name: 'Icons',
        meta: { title: '发布题解', noCache: true, roles: ['admin', 'userAdmin', 'test', 'superadmin'] }
      }
    ]
  },
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/page',
    alwaysShow: true, // will always show the root menu
    name: 'Notice',
    meta: {
      title: '公告',
      icon: 'documentation',
      noCache: true,
      roles: ['admin', 'announcementManager']
    },
    children: [
      {
        path: 'manage',
        component: () => import('@/views/a-MyViews/notice'),
        name: 'Icons',
        meta: { title: '公告管理', noCache: true, roles: ['admin', 'announcementManager'] }
      },
      {
        path: 'deplay',
        component: () => import('@/views/a-MyViews/publish'),
        name: 'Icons',
        meta: { title: '发布公告', noCache: true, roles: ['admin', 'announcementManager'] }
      },
      {
        path: 'carousel',
        component: () => import('@/views/a-MyViews/carousel'),
        name: 'Icons',
        meta: { title: '轮播图管理', noCache: true, roles: ['admin', 'announcementManager'] }
      }
    ]
  },
  {
    path: '/market',
    component: Layout,
    redirect: '/market/page',
    alwaysShow: true, // will always show the root menu
    name: 'Market',
    meta: {
      title: '商城',
      icon: 'shopping',
      noCache: true,
      roles: ['admin', 'goodsManager']
    },
    children: [
      {
        path: 'goods',
        component: () => import('@/views/a-MyViews/market/goods'),
        name: 'Icons',
        meta: { title: '商品管理', noCache: true, roles: ['admin', 'goodsManager'] }
      },
      {
        path: 'type',
        component: () => import('@/views/a-MyViews/market/type'),
        name: 'Icons',
        meta: { title: '商品类型管理', noCache: true, roles: ['admin', 'goodsManager'] }
      },
      {
        path: 'order',
        component: () => import('@/views/a-MyViews/market/order'),
        name: 'Icons',
        meta: { title: '订单管理', noCache: true, roles: ['admin', 'goodsManager'] }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: '图标', icon: 'icon', noCache: true, roles: ['admin', 'userAdmin', 'test', 'superadmin'] }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  mode: 'history'
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
