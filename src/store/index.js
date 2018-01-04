import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text: '',
    previousText: '',
    texts: [],
    goalTime: 10000,
    eraseTime: 6000
  },

  getters: {
    trashedTexts: state => state.texts.filter(text => text.trashed),
    nonTrashedTexts: state => state.texts.filter(text => !text.trashed)
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
    saveText (state, text) {
      state.texts.push(text)
    },
    setTexts (state, texts) {
      state.texts = texts
    },
    trashText (state, textToFind) {
      state.texts.find(text => text === textToFind).trashed = true
      // state.texts.splice(index, 1)
    },
    restoreText (state, textToFind) {
      state.texts.find(text => text === textToFind).trashed = false
    }
  }
})
