<template>
  <section class="trashPage">
    <section class="texts">
      <h1>Stored Texts</h1>
      <ol>
        <li v-for="text in nonTrashedTexts">{{ text.content }}</li>
      </ol>
    </section>

    <section class="trash">
      <h1>Trash</h1>
      <ol>
        <li v-for="text in trashedTexts">{{ text.content }}</li>
      </ol>
    </section>
  </section>

    

  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import TextsActions from '@/components/TextsActions'
import TrashTextsActions from '@/components/TrashTextsActions'

export default {
  name: 'TextsPage',

  components: {
  },

  computed: {
    ...mapState([
      'texts'
    ]),
    ...mapGetters([
      'nonTrashedTexts',
      'trashedTexts'
    ])
  },

  mounted () {
    this.showMenu()
  },

  data () {
    return {
      columns: [
        {
          type: 'selection',
          width: 52
        },
        {
          title: 'Title',
          key: 'content'
        },
        {
          title: ' ',
          width: 100,
          render: (h, params) => {
            return h(TextsActions, {
              props: {
                text: this.texts[params.index]
              }
            })
          }
        }
      ],
      trashColumns: [
        {
          type: 'selection',
          width: 52
        },
        {
          title: 'Title',
          key: 'content'
        },
        {
          title: ' ',
          width: 110,
          render: (h, params) => {
            return h(TrashTextsActions, {
              props: {
                text: params.row
              }
            })
          }
        }
      ]
    }
  },

  methods: {
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
      'showMenu'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>