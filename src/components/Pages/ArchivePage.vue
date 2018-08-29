<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="(text, index) in archivedTexts" :key=index>
          <v-card>
            <v-card-text style="white-space: pre-line;">
              {{ text.content }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <v-btn slot="activator" icon @click="onUnarchive(text)">
                  <v-icon>unarchive</v-icon>
                </v-btn>
                <span>Restore from archive</span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn slot="activator" icon @click="onRemove(text)">
                  <v-icon>delete</v-icon>
                </v-btn>
                <span>Delete</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-snackbar
      :timeout="6000"
      bottom left
      v-model="showSnackbar"
    >
      {{ snackbarText }}
      <v-btn flat color="pink" @click.native="() => { 
        showSnackbar = false; 
        snackbarAction.action() 
      }">
        {{ snackbarAction.label }}
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import * as VCard from 'vuetify/es5/components/VCard'
import * as VList from 'vuetify/es5/components/VList'
import {
  VMenu,
  VTooltip,
  VSnackbar
} from 'vuetify'

export default {
  name: 'TextsPage',

  components: {
    ...VCard,
    ...VList,
    VMenu,
    VTooltip,
    VSnackbar
  },

  computed: {
    ...mapState([
      'texts'
    ]),
    ...mapGetters([
      'nonTrashedTexts',
      'archivedTexts'
    ])
  },

  mounted () {
    this.showMenu()
    this.setMenuButton()
  },

  data () {
    return {
      showSnackbar: false,
      snackbarText: '',
      snackbarAction: {
        'label': '',
        'action': null
      }
    }
  },

  methods: {
    onDownload (text) {
      this.fileDownload(text.content)
    },

    onRemove (text) {
      this.$store.commit('trashText', text)

      this.snackbarText = 'Text has been archived'
      this.snackbarAction = {
        'label': 'Undo',
        'action': () => this.$store.commit('restoreText', text)
      }
      this.showSnackbar = true
    },

    onUnarchive (text) {
      this.$store.commit('restoreText', text)
    },

    /**
     * Let browser download file with the text
     */
    fileDownload (text) {
      var pom = document.createElement('a')
      pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
      pom.setAttribute('download', 'text.txt')

      var event = document.createEvent('MouseEvents')
      event.initEvent('click', true, true)
      pom.dispatchEvent(event)
    },

    ...mapMutations([
      'showMenu',
      'setMenuButton'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>