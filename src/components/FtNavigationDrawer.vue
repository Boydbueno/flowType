<template>
  <VNavigationDrawer
    v-model="open"
    clipped
    app
    fixed
  >
    <v-list>
      <v-list-tile
        ripple
        :to="{name: 'SetupPage'}"
      >
        <v-list-tile-content>
          <v-list-tile-title>Typing</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile
        ripple
        :to="{name: 'TextsPage'}"
      >
        <v-list-tile-content>
          <v-list-tile-title>Texts</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider />

      <v-list-tile
        ripple
        :to="{name: 'ArchivePage'}"
      >
        <v-list-tile-content>
          <v-list-tile-title>Archive</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </VNavigationDrawer>
</template>

<script>
import { VNavigationDrawer } from 'vuetify/lib'
import * as VList from 'vuetify/lib/components/VList'

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
