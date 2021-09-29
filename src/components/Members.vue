<template>
  <v-card
    width="100%"
    dark
    flat
    tile
    class="mcard"
  >
    <v-list
      class="server-info flex-1"
      dense
    >
      <v-subheader>{{$t('members', { count: members.length })}} </v-subheader>
      <v-list-item-group v-model="member">
        <v-list-item
          v-for="(item, i) in members"
          :key="i"
          :to="'/pv/' + item._id"
          class="member-item"
        >
          <!-- <img
              :src="item.img"
              alt="alt"
            /> -->
          <v-icon
            size="20"
            class="icon mr-2"
          >mdi-account</v-icon>
          <v-list-item-content>
            <v-list-item-title
              class="member-title pb-1"
              v-text="`${item.username}`"
            ></v-list-item-title>
            <v-list-item-title
              class="member-title pt-1"
              v-text="`${item.name} ${item.family}`"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

    </v-list>

    <v-list
      width="100%"
      dense
      v-if="canAddMember"
    >
      <v-list-item @click="showAddMember = true">
        <v-list-item-icon>
          <v-icon v-text="'mdi-plus'"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            class="channel-title"
            v-text="$t('addMember')"
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-dialog
      v-model="showAddMember"
      max-width="400px"
      dark
    >
      <v-card>
        <v-card-title>
          <span
            v-t="'addMemberToRoom'"
            class="text-h5"
          />
        </v-card-title>

        <v-card-text>
          <UserSelect
            v-model="newUser"
            :exclude="members.map(item => item._id)"
          />
          <v-btn
            depressed
            dark
            large
            :disabled="!newUser"
            @click="addUser"
            v-t="'add'"
          />

        </v-card-text>

      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import UserSelect from './common/UserSelect.vue';
import { memberRole } from "@/constants/types";

export default {
  props: {
    members: {
      type: Array,
      default: () => ([])
    },
    roomId: {
      type: String,
      default: ''
    },
    userId: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      member: 0,
      showAddMember: false,
      newUser: null
    };
  },
  components: {
    UserSelect,
  },
  computed: {
    canAddMember () {
      const me = (this.members || []).find(item => item._id === this.userId);
      return me && me.role < memberRole.USER;
    }
  },
  methods: {
    async addUser () {
      if (!this.newUser || !this.roomId) return;

      try {
        await this.axios.post(`/rooms/${this.roomId}/member`,
          {
            userId: this.newUser._id
          })
        this.$emit('add-member', this.newUser)
        this.$socket.emit('update-rooms', this.newUser._id);
        this.showAddMember = false;
        this.newUser = null;
      } catch (error) {
        console.log(error)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.member-item {
  direction: ltr;
  .member-title {
    font-size: 16px;
    text-align: left;
  }
}
</style>
