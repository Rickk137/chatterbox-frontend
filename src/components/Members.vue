<template>
  <v-card
    width="100%"
    dark
    flat
    tile
    class="mcard"
  >
    <v-list
      rounded
      dense
    >
      <v-subheader>ONLINE ({{ $store.state.members.length }})</v-subheader>
      <v-list-item-group
        v-model="member"
        color=""
      >
        <v-list-item
          v-for="(item, i) in $store.state.members"
          :key="i"
        >
          <v-list-item-avatar>
            <img
              :src="item.img"
              alt="alt"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              class="channel-title"
              v-text="item.name"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

    </v-list>

    <v-list
      width="100%"
      dense
    >
      <v-list-item @click="showAddMember = true">
        <v-list-item-icon>
          <v-icon v-text="'mdi-plus'"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            class="channel-title"
            v-text="'Add Member'"
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
          <span class="text-h5">Add Member to the Room</span>
        </v-card-title>

        <v-card-text>
          <UserSelect v-model="members" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import socket from "../socket";
import UserSelect from './common/UserSelect.vue';

export default {
  data () {
    return {
      member: 0,
      showAddMember: false,
      members: []
    };
  },
  components: {
    UserSelect,
  },
  mounted () {
    if (this.$store.state.membersComponentMounted) return;
    this.$store.commit("membersMounted");
    console.say("members mount");
    socket.getMembers((data) => {
      console.say("getMem", data);
      this.$store.commit("pushMembers", data);
    });
    socket.addEvent("memberJoin", (data) => {
      console.say("memberJoin", data);
      if (data.id == socket.sid) {
        //isMe
        this.member = this.$store.state.members.length;
        this.$store.commit("updateAvatar", data.user.img || "guest.png");
        this.$store.commit("setNick", data.user.nick);
      }
      this.$store.commit("pushMembers", data);

      this.$store.commit("pushChat", {
        user: {
          nick: "SERVER",
          img: this.$store.state.ownerIcon,
        },
        msg: data.user.nick + " has joined the chat.",
      });
    });

    socket.addEvent("memberLeave", (sid) => {
      this.$store.commit("removeMember", sid);
    });
  },
};
</script>
