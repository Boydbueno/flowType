import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      availableTimes: [
        {
          label: '15 min',
          milliseconds: 60000 * 15
        },
        {
          label: '30 min',
          milliseconds: 60000 * 30
        },
        {
          label: '60 min',
          milliseconds: 60000 * 60
        }
      ]
    },

    text: '',
    previousText: '',

    goalTime: 10000,
    eraseTime: 6000
  },

  mutations: {
    updateGoalTime (state, goalTime) {
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
