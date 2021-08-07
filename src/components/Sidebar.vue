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
          >
            <v-subheader>Rooms:</v-subheader>
            <v-list-item-group
              v-model="item"
              color="primary"
            >
              <v-list-item
                v-for="(item, i) in rooms"
                :key="i"
              >
                <v-list-item-icon>
                  <v-icon v-text="'mdi-bell-alert'"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="channel-title"
                    v-text="item.name"
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
              v-text="'Create Room '"
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
      @click="toggleAC"
    >
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            :src="$store.state.myIcon"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ $store.state.myNick }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <CreateRoom
      :show="createRoomModal"
      @close="createRoomModal = false"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CreateRoom from '@/components/CreateRoom';

export default {
  components: {
    CreateRoom
  },

  data () {
    return {
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
    ])
  },

  updated () {
    this.$store.commit("changeChannel", this.item);
  },

  methods: {
    toggleAC () {
      this.$store.commit("toggleAC");
    }
  },

  mounted () {
    this.$store.commit("updateChannels", this.items);
  }
};
</script>
