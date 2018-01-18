<template>
	<section class="setup">

    <i-row type="flex" justify="center" gutter="30">
      <i-col span="18">
        <i-card>

          <h1 slot="title">Setup</h1>

          <i-row>
            <i-col span="12" type="flex" justify="center">
              <i-row>
                <section class="setting">
                  <i-card>
                    <p slot="title">Time to type</p>

                    <i-radio-group v-model="time" type="button">
                      <i-radio v-for="(time, key) in availableTimes" :label="time.label" :key="key">
                      </i-radio>
                    </i-radio-group>
                  </i-card>
                </section>
              </i-row>

              <i-row>
                <section class="setting">
                  <i-card>
                    <p slot="title">Theme</p>
                  </i-card>
                </section>
              </i-row>
            </i-col>

            <i-col span="12">
              <i-row>
                <section class="setting">
                  <i-card>
                    <p slot="title">Font</p>
                  </i-card>
                </section>
              </i-row>
              
              <i-row>
                <section>
                  <i-card class="setting">
                    <p slot="title">Countdown style</p>
                  </i-card>
                </section>
              </i-row>
            </i-col>
          </i-row>

          <i-row>
            <section>
              <i-button long type="primary" @click="$router.push('writer')">Go</i-button>
            </section>
          </i-row>

        </i-card>
      </i-col>
    </i-row>

	</section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import settings from '@/settings'

import { Button, Radio, RadioGroup, Menu, MenuItem, Row, Col, Card } from 'iview'

export default {
  name: 'SetupPage',

  components: {
    'i-row': Row,
    'i-col': Col,
    'i-card': Card,
    'i-menu': Menu,
    'i-menu-item': MenuItem,
    'i-button': Button,
    'i-radio-group': RadioGroup,
    'i-radio': Radio
  },

  computed: {
    availableTimes: () => settings.availableTimes,
    ...mapState([
      'goalTime'
    ]),
    time: {
      get () {
        return this.$store.state.goalTime + ' min'
      },
      set (value) {
        this.setGoalTime(value)
      }
    }
  },

  methods: {
    ...mapMutations([
      'setGoalTime'
    ]),
    route (name) {
      this.$router.push(name)
    }
  }
}
</script>

<style lang="scss" scoped>
  .setting {
    margin-bottom: 20px;
  }
</style>