<template>
  <div>
    <v-container grid-list-md>
      <v-layout
        row
        wrap
      >
        <v-flex
          v-for="(text, index) in archivedTexts"
          :key="index"
          xs12
          sm6
          md4
        >
          <VCard>
            <v-card-text style="white-space: pre-line;">
              {{ text.content }}
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <VTooltip bottom>
                <v-btn
                  slot="activator"
                  icon
                  @click="onUnarchive(text)"
                >
                  <v-icon>unarchive</v-icon>
                </v-btn>
                <span>Restore from archive</span>
              </VTooltip>
              <VTooltip bottom>
                <v-btn
                  slot="activator"
                  icon
                  @click="onRemove(text)"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
                <span>Delete</span>
              </VTooltip>
            </v-card-actions>
          </VCard>
        </v-flex>
      </v-layout>
    </v-container>

    <VSnackbar
      v-model="showSnackbar"
      :timeout="6000"
      bottom
      left
    >
      {{ snackbarText }}
      <v-btn
        flat
        color="pink"
        @click.native="() => {
          showSnackbar = false;
          snackbarAction.action()
        }"
      >
        {{ snackbarAction.label }}
      </v-btn>
    </VSnackbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import * as VCard from 'vuetify/lib/components/VCard'
import * as VList from 'vuetify/lib/components/VList'
import {
  VTooltip,
  VSnackbar
} from 'vuetify/lib'

export default {
  name: 'TextsPage',

  components: {
    ...VCard,
    ...VList,
    VTooltip,
    VSnackbar
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
      let pom = document.createElement('a')
      pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
      pom.setAttribute('download', 'text.txt')

      let event = document.createEvent('MouseEvents')
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
