import { asyncRouterMap, constantRouterMap } from '@/router'

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return route.meta.role.indexOf(roles) >= 0
  } else {
    return true
  }
}

const state = {
  routers: constantRouterMap,
  addRouters: []
}
const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers
    state.routers = constantRouterMap.concat(routers)
  }
}
const actions = {
  generateRoutes({ commit }, data) {
    return new Promise(resolve => {
      const { roles } = data
      const accessedRouters = asyncRouterMap.filter(v => {
        if (hasPermission(roles, v)) {
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter(child => {
              if (hasPermission(roles, child)) {
                return child
              }
              return false
            })
            return v
          } else {
            return v
          }
        }
        return false
      })
      commit('SET_ROUTERS', accessedRouters)
      resolve()
      return accessedRouters
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
