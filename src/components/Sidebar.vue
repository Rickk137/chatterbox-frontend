<template>
  <div class="sidebar">
    <div class="sb-container">
      <v-card
        height="100%"
        dark
        flat
        tile
        class="server-info flex-1"
      >

        <v-card
          tile
          height="100%"
          class="channels"
        >

          <v-list
            width="100%"
            dense
            v-if="currentChannel !== 'room'"
          >
            <v-subheader>{{$t('private')}}:</v-subheader>
            <v-list-item-group
              v-model="item"
              color="primary"
            >
              <v-list-item
                v-for="(item, i) in filteredPv"
                :key="i"
                :to="`/pv/${item._id}`"
                :class="{ notification: pvMessages[item._id] && pvMessages[item._id].notification}"
              >
                <v-list-item-content>
                  <v-list-item-title
                    class="channel-title"
                    v-text="`${item.name} ${item.family}`"
                  ></v-list-item-title>
                </v-list-item-content>

                <v-btn
                  dark
                  icon
                  @click="() => call(item._id)"
                >
                  <v-icon
                    size="20"
                    class="icon"
                  >
                    mdi-phone
                  </v-icon>
                </v-btn>

              </v-list-item>
            </v-list-item-group>

          </v-list>

          <v-list
            width="100%"
            dense
            v-if="currentChannel !== 'pv'"
          >
            <v-subheader>{{$t('rooms')}}:</v-subheader>
            <v-list-item-group
              v-model="item"
              color="primary"
            >
              <v-list-item
                v-for="(item, i) in rooms"
                :key="i"
                :to="`/rooms/${item._id}`"
                :class="{ notification: roomMessages[item._id] && roomMessages[item._id].notification}"
              >
                <v-list-item-content>
                  <v-list-item-title
                    class="channel-title"
                    v-text="`# ${item.name}`"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>

          </v-list>

        </v-card>
      </v-card>
    </div>
    <v-card
      class="mystats"
      tile
      dark
      v-if="currentChannel !== 'pv'"
    >
      <v-list
        width="100%"
        dense
      >
        <v-list-item @click="createRoomModal = true">
          <v-list-item-icon>
            <v-icon v-text="'mdi-plus'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="channel-title"
              v-text="$t('createRoom')"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <v-card
      height="52"
      dark
      tile
      flat
      class="mystats"
    >
      <v-list-item
        :to="`/pv/${user.id}`"
        class="grow"
      >
        <v-btn
          color="darken-3"
          icon
          @click="profileModal = true"
        >
          <v-icon
            size="18"
            class="icon"
          >
            mdi-pen
          </v-icon>
        </v-btn>

        <v-list-item-content class="grow">
          <v-list-item-title v-if="user">{{ `${user.name} ${user.family}`}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <RoomDialog
      :show="createRoomModal"
      @close="createRoomModal = false"
    />
    <v-dialog
      v-model="profileModal"
      max-width="600px"
      dark
    >
      <ProfileDialog
        v-if="profileModal"
        :show="profileModal"
        @close="profileModal = false"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RoomDialog from '@/components/room/RoomDialog';
import ProfileDialog from '@/components/ProfileDialog';

export default {
  components: {
    RoomDialog,
    ProfileDialog
  },

  data () {
    return {
      profileModal: false,
      createRoomModal: false,
      item: 0,
      items: [
        { text: "Announcements", icon: "mdi-bell-alert" },
        { text: "Rules", icon: "mdi-file-check" },
        { text: "Welcome", icon: "mdi-emoticon" }
      ]
    };
  },
  computed: {
    ...mapState('chat', [
      'rooms',
      'roomMessages',
      'pvRooms',
      'pvMessages',
      'currentChannel'
    ]),
    ...mapState('auth', ['user']),
    filteredPv () {
      return !this.user ? this.pvRooms : this.pvRooms.filter(item => item._id !== this.user.id)
    }
  },
  methods: {
    ...mapActions(['call']),
  },
};
</script>
