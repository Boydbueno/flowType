<template>
  <div>
    <i-row type="flex" justify="center">
      <i-col span="10">
        <section class="texts">
          <i-table :columns="columns" :data="nonTrashedTexts" no-data-text="There are no saved texts"></i-table>
        </section>
      </i-col>
    </i-row>

    <i-row type="flex" justify="center">
      <h1>Trash</h1>
    </i-row>
    <i-row type="flex" justify="center">
      <i-col span="10">
        <section class="texts">
          <i-table :columns="trashColumns" :data="trashedTexts" no-data-text="There are no texts in your trash"></i-table>
        </section>
      </i-col>
    </i-row>
    <i-row type="flex" justify="center">
      <i-button @click="$router.push('/')">Back</i-button>
    </i-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import TextsActions from '@/components/TextsActions'
import TrashTextsActions from '@/components/TrashTextsActions'

import { Table, Row, Col, Button, Icon } from 'iview'

export default {
  name: 'TextsPage',

  components: {
    'i-button': Button,
    'i-table': Table,
    'i-icon': Icon,
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
          width: 68,
          render: (h, params) => {
            return h(TrashTextsActions, {
              props: {
                text: this.texts[params.index]
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .texts {
    height: 100%;
    margin: 0 auto;
    background-color: #cecec4;
  }
</style>