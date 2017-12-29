import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text: '',
    previousText: '',

    texts: [
      {
        timestamp: 1,
        content: 'This is a text that I typed, presumably'
      },
      {
        timestamp: 2,
        content: 'This is another text that I typed, presumably'
      }
    ],

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
    },
    removeTextByIndex (state, index) {
      state.texts.splice(index, 1)
    }
  }
})
