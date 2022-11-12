const state = {
  createTimes: []
}

const mutations = {
  INIT_CREATE_TIME: (state) => {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    state.createTimes.push(start)
    state.createTimes.push(end)
  },
  SET_CREATE_TIME: (state, createTimes) => {
    state.createTimes[0] = createTimes[0]
    state.createTimes[1] = createTimes[1]
  }
}

const actions = {
  init({ commit }) {
    commit('INIT_CREATE_TIME')
    return new Promise(resolve => {
      resolve(state.createTimes)
    })
  },
  setCreateTimes({ commit }, createTimes) {
    commit('SET_CREATE_TIME', createTimes)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

