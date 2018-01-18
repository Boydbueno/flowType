<template>
  <section class="texts">
    
    <i-row type="flex" justify="center">
      <i-col span="18">
        <i-card>

          <h1 slot="title">Stored Texts</h1>
          <i-row>
            <i-card>
              <section class="texts">
                <i-table :columns="columns" :data="nonTrashedTexts" no-data-text="There are no saved texts"></i-table>
              </section>
            </i-card>
          </i-row>

          <i-row>
            <h1>Trash</h1>
            <i-card>
              <section class="texts">
                <i-table :columns="trashColumns" :data="trashedTexts" no-data-text="There are no texts in your trash"></i-table>
              </section>
            </i-card>
          </i-row>

        </i-card>
      </i-col>
    </i-row>

    

  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import TextsActions from '@/components/TextsActions'
import TrashTextsActions from '@/components/TrashTextsActions'

import { Table, Row, Col, Button, Icon, Card } from 'iview'

export default {
  name: 'TextsPage',

  components: {
    'i-button': Button,
    'i-table': Table,
    'i-icon': Icon,
    'i-card': Card,
    'i-row': Row,
    'i-col': Col
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