<template>
  <v-navigation-drawer clipped app fixed v-model="open">
    <v-list>
      <v-list-tile ripple :to="{ name: 'SetupPage' }">
        <v-list-tile-content>
          <v-list-tile-title>Typing</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

       <v-list-tile ripple :to="{ name: 'TextsPage' }">
        <v-list-tile-content>
          <v-list-tile-title>Texts</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider></v-divider>

      <v-list-tile ripple :to="{ name: 'ArchivePage' }">
        <v-list-tile-content>
          <v-list-tile-title>Archive</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {VNavigationDrawer} from 'vuetify'
import * as VList from 'vuetify/es5/components/VList'

export default {
  name: 'FtNavigationDrawer',

  components: {
    ...VList,
    VNavigationDrawer
  },

  props: {
    open: Boolean
  }
}
</script>