import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state () {
    return {
      count: 0,
      user: {},
      patientsTotal: null,
      searchQuery: null,
      searchResults: []
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
    },
    searchResults (state, result) {
      state.searchResults = result
    },
    searchQuery (state, query) {
      state.searchQuery = query
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
    },
    async searchPatients ({ commit }, query) {
      try {
        const response = await axios.get('/api/patients/search', {
          params: { query: query },
        })

        commit('searchQuery', query)
        commit('searchResults', response.data.patients)
        console.log(response.data.patients)

      } catch (error) {
        console.error(error)
      }
    },
    async getByCep (_, cep) {
      try {
        const response = await axios.get(`/api/viacep/${ cep }`)
        return response.data
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
