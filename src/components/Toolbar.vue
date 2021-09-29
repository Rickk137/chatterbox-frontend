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
      <v-avatar
        @click="() => findUserDialog = true"
        class="round-tools-icon"
      >
        <v-icon
          size="30"
          class="icon"
        >mdi-magnify</v-icon>
      </v-avatar>

      <v-dialog
        v-model="findUserDialog"
        max-width="400px"
        dark
      >
        <v-card>
          <v-card-title>
            <span
              v-t="'findUser'"
              class="text-h5"
            />
          </v-card-title>

          <v-card-text>
            <UserSelect
              v-model="chatUser"
              :exclude="excludeList"
            />
            <v-btn
              depressed
              dark
              large
              :disabled="!chatUser"
              @click="startChat"
              v-t="'startChat'"
            />

          </v-card-text>

        </v-card>
      </v-dialog>

    </v-card>
  </nav>
</template>

<script>
import UserSelect from './common/UserSelect.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Toolbar',
  data () {
    return {
      chatUser: null,
      findUserDialog: false
    }
  },
  components: {
    UserSelect,
  },
  computed: {
    ...mapState('chat', ['currentChannel']),
    ...mapState('auth', ['user']),
    excludeList () {
      return this.user ? [this.user.id] : []
    }
  },
  methods: {
    startChat () {
      this.$router.push('/pv/' + this.chatUser._id);
      this.chatUser = null;
      this.findUserDialog = false;
    },
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