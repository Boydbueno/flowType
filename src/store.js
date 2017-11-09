import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
    },

    goalTime: 10000,
    eraseTime: 6000
  },

  mutations: {
    updateGoalTime (state, goalTime) {
      state.goalTime = parseInt(goalTime)
    }
  }
})
