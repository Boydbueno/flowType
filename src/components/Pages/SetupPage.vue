<template>
	<div>
    <v-card>
      <v-subheader>Setup</v-subheader>
      <v-card-text>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs11>
              <v-slider v-model="time" label="Time to type" thumb-label step="5" :max=max ticks></v-slider>
            </v-flex>
            <v-flex xs1>
              <v-text-field v-model="time" step="5" min=0 :max=max type="number" suffix="minutes"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-text>
        <v-fab-transition>
          <v-btn
            color="green"
            v-show="time !== 0"
            :to="{ name: 'TypePage'}"
            absolute
            dark
            fab
            bottom
            right
          >
            <v-icon>play_arrow</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card-text>
    </v-card>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import * as VCard from 'vuetify/es5/components/VCard'
import { VSlider, VSubheader, VTextField } from 'vuetify'
import { VFabTransition } from 'vuetify/es5/components/transitions'

export default {
  name: 'SetupPage',

  components: {
    ...VCard,
    VSlider,
    VSubheader,
    VTextField,
    VFabTransition
  },

  data: () => {
    return {
      max: 60
    }
  },

  computed: {
    ...mapState([
      'goalTime'
    ]),
    time: {
      get () {
        return this.$store.state.goalTime / 60000
      },
      set (value) {
        this.setGoalTime(value * 60000)
      }
    }
  },

  mounted () {
    this.showMenu()
    this.setMenuButton()
  },

  methods: {
    ...mapMutations([
      'setGoalTime',
      'showMenu',
      'setMenuButton'
    ]),
    route (name) {
      this.$router.push(name)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>