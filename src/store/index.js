import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text: '',
    previousText: '',
    texts: [],
    goalTime: 10000,
    eraseTime: 6000,
    showMenu: true
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
      state.texts.find(text => text.content === textToFind.content).trashed = true
    },
    restoreText (state, textToFind) {
      state.texts.find(text => text.content === textToFind.content).trashed = false
    },
    removeText (state, textToFind) {
      let textToRemove = state.texts.find(text => text.content === textToFind.content)
      let index = state.texts.indexOf(textToRemove)
      state.texts.splice(index, 1)
    },
    hideMenu (state) {
      state.showMenu = false
    },
    showMenu (state) {
      state.showMenu = true
    }
  }
})
