import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRouterMap = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},

{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '仪表盘',
      icon: 'dashboard'
    }
  }]
},

{
  path: '/unfinishOrder',
  component: Layout,
  name: 'UnfinishOrder',
  meta: {
    title: '未完成的订单',
    icon: '订单处理',
    breadcrumb: false
  },
  children: [{
    path: 'table',
    name: 'Table',
    component: () => import('@/views/unfinishOrder/table/index'),
    meta: {
      title: '外卖订单',
      icon: 'table'
    }
  },
  {
    path: 'table1',
    name: 'Table1',
    component: () => import('@/views/unfinishOrder/table1/index'),
    meta: {
      title: '店内订单',
      icon: 'table'
    }
  }]
},

{
  path: '/finishOrder',
  component: Layout,
  name: 'FinishOrder',
  meta: {
    title: '完成的订单',
    icon: '订单完成',
    breadcrumb: false
  },
  children: [{
    path: 'ftable',
    name: 'FTable',
    component: () => import('@/views/finishOrder/table/index'),
    meta: {
      title: '外卖订单',
      icon: 'table'
    }
  },
  {
    path: 'ftable1',
    name: 'FTable1',
    component: () => import('@/views/finishOrder/table1/index'),
    meta: {
      title: '店内订单',
      icon: 'table'
    }
  }]
}]

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/meal',
    name: 'Meal',
    component: Layout,
    meta: {
      role: ['admin'],
      title: '菜单管理',
      icon: '菜单',
      breadcrumb: false
    },
    children: [{
      path: 'cate',
      name: 'Cate',
      redirect: '/meal/cate/cate-query',
      component: () => import('@/views/meal/cate/index'),
      meta: {
        title: '食物分类'
      },
      children: [{
        path: 'cate-query',
        name: 'Cate-Query',
        component: () => import('@/views/meal/cate/cateQuery/index'),
        meta: {
          title: '查询/修改/新增餐品分类'
        }
      }]
    }, {
      path: 'food',
      name: 'Food',
      redirect: '/meal/food/food-query',
      component: () => import('@/views/meal/food/index'),
      meta: {
        title: '食物'
      },
      children: [{
        path: 'food-query',
        name: 'Food-Query',
        component: () => import('@/views/meal/food/foodQuery/index'),
        meta: {
          title: '查询食物'
        }
      }, {
        path: 'food-add',
        name: 'Food-Add',
        component: () => import('@/views/meal/food/foodAdd/index'),
        meta: {
          title: '添加食物'
        }
      }, {
        path: 'food-detail',
        name: 'Food-Detail',
        component: () => import('@/views/meal/food/foodDetail/index'),
        meta: {
          title: '食物配料'
        }
      }]
    }]
  }, {
    path: '/staff',
    component: Layout,
    meta: {
      role: ['admin']
    },
    children: [{
      path: '/staff',
      name: 'Staff',
      component: () => import('@/views/staff/index'),
      meta: {
        title: '员工管理',
        icon: 'el-icon-user-solid'
      }
    }]
  },
  {
    path: '/user-info',
    component: Layout,
    meta: {
      role: ['assistant']
    },
    children: [{
      path: '/user-info',
      name: 'UserInfo',
      component: () => import('@/views/userInfo/index'),
      meta: {
        title: '修改密码',
        icon: 'el-icon-user-solid'
      }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
