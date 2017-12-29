<template>
  <div>
    <i-row type="flex" justify="center">
      <i-col span="10">
        <section class="texts">
          <i-table :columns="columns" :data="texts" no-data-text="There are no saved texts"></i-table>
        </section>
      </i-col>
    </i-row>
    <i-row type="flex" justify="center">
      <i-button @click="$router.push('/')">Back</i-button>
    </i-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
            return h('div', [
              h(Button, {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    let text = this.texts[params.index].content
                    this.fileDownload(text)
                    console.log(params.index)
                  }
                },
                style: {
                  marginRight: '5px'
                }
              }, [
                h(Icon, {
                  props: {
                    type: 'ios-download-outline',
                    size: 20
                  }
                })
              ]),
              h(Button, {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$store.commit('removeTextByIndex', params.index)
                  }
                }
              }, [
                h(Icon, {
                  props: {
                    type: 'trash-a',
                    size: 20
                  }
                })
              ])
            ])
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