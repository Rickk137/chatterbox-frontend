<template>
  <nav class="guilds">
    <v-card
      dark
      flat
      tile
      width="100%"
      height="100%"
    >
      <v-avatar
        :class="['round-icon', {'active': currentChannel === 'all'}]"
        @click="() => clickIcon('all')"
      >
        <v-icon size="30">mdi-home</v-icon>
      </v-avatar>
      <br />
      <v-avatar
        :class="['round-icon', {'active': 'pv' === currentChannel}]"
        @click="() => clickIcon('pv')"
      >
        <v-icon size="30">mdi-account</v-icon>
      </v-avatar>
      <v-avatar
        :class="['round-icon', {'active': 'room' === currentChannel}]"
        @click="() => clickIcon('room')"
      >
        <v-icon size="30">mdi-account-group </v-icon>
      </v-avatar>

      <!-- <v-avatar class="round-tools-icon">
        <v-icon
          size="30"
          class="icon"
        >mdi-plus</v-icon>
      </v-avatar> -->
      <v-avatar class="round-tools-icon">
        <v-icon
          size="30"
          class="icon"
        >mdi-magnify</v-icon>
      </v-avatar>
     
    </v-card>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Toolbar',
  computed: {
    ...mapState('chat', ['currentChannel'])
  },
  methods: {
    clickIcon (channel) {
      this.changeChannel({ channel });
    },
    ...mapActions('chat', [
      'changeChannel',
    ]),
  },
}
</script>

<style lang="scss" scoped>
</style>