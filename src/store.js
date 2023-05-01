import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state () {
    return {
      count: 0,
      user: {},
      patientsTotal: null
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
    },
    patientsTotal (state, total) {
      state.patientsTotal = total
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
    },
    getTotalPatients ({ commit }) {
      try {
        axios.get('api/patients/total').then(res => {
          commit('patientsTotal', res.data)
        })
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    totalPatients: state => state.patientsTotal
  }
})

export default store
