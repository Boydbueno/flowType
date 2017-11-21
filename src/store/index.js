import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text: '',
    previousText: '',

    goalTime: 10000,
    eraseTime: 6000
  },

  mutations: {
    setGoalTime (state, goalTime) {
      state.goalTime = parseInt(goalTime)
    },
    updateText (state, text) {
      state.text = text
    },
    updatePreviousText (state) {
      state.previousText = state.text
    }
  }
})
