import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      count: 0,
      user: {}
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    },
    user (state, user) {
      state.user = user
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    decrement (context) {
      context.commit('decrement')
    },
    saveUser ({ commit }, user) {
      console.log(user)
      commit('user', user)
    }
  },
  getters: {
    getCount: state => state.count
  }
})

export default store
