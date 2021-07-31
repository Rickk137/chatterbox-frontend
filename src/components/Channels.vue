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
        :class="['round-icon', {'active': currentChannel === 'Home'}]"
        @click="() => clickIcon('Home')"
      >
        <v-icon size="30">mdi-home</v-icon>
      </v-avatar>
      <br />
      <hr />
      <v-avatar
        v-for="channel in channels"
        :key="channel.id"
        :class="['round-icon', {'active': currentChannel === channel.id}]"
        @click="() => clickIcon(channel.id)"
      >
        <v-icon size="30">{{channel.icon}}</v-icon>
      </v-avatar>

      <v-avatar class="round-tools-icon">
        <v-icon
          size="30"
          class="icon"
        >mdi-plus</v-icon>
      </v-avatar>
      <v-avatar class="round-tools-icon">
        <v-icon
          size="30"
          class="icon"
        >mdi-magnify</v-icon>
      </v-avatar>
      <v-avatar class="round-tools-icon">
        <v-icon
          size="30"
          class="icon"
        >mdi-download</v-icon>
      </v-avatar>
    </v-card>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState('chat', ['currentChannel', 'channels'])
  },
  methods: {
    clickIcon (channel) {
      console.log(this.$socket)
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