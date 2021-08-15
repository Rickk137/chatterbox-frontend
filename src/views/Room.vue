<template>
  <div>
    <Chat
      :receiverType="receiverType"
      :receiver="receiver"
      :messages="messages"
      @loadMore="loadMore"
      @scrollToEnd="scrollToEnd"
    ></Chat>

    <div class="members hidden-sm-and-down">
      <Members
        :roomId="receiver"
        :members="members"
        @add-member="addMember"
      ></Members>
    </div>

    <v-navigation-drawer
      class="hidden-md-and-up"
      v-model="drawer"
      color="#1E1E1E"
      right
      dark
      absolute
    >
      <Members
        :roomId="receiver"
        :members="members"
        @add-member="addMember"
      ></Members>
    </v-navigation-drawer>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { receiverTypes } from "@/constants/types";
import Chat from "@/components/Chat.vue";
import Members from "@/components/Members.vue";
import { LIMIT } from "@/constants/types";

export default {
  name: "Room",

  data () {
    return {
      drawer: false,
      members: []
    }
  },
  components: {
    Chat,
    Members,
  },
  methods: {
    ...mapActions('chat', ['getRoomMessages']),
    addMember (user) {
      this.members.push(user);
    },
    loadMore ($state) {
      this.getRoomMessages({ roomId: this.receiver, loadMore: true }).then((data) => {
        if (!data || data.length < LIMIT) {
          $state.complete();
        } else {
          $state.loaded();
        }
      });
    },
    scrollToEnd () {
      this.$nextTick(() => {
        const msgElement = document.getElementById("messages");
        msgElement.scrollTop = msgElement.scrollHeight;
      })
    },
    async getRoomInfo () {
      try {
        const { data } = await this.axios.get("rooms/" + this.receiver);
        this.members = (data.members || []).map(member => ({ ...member.userId, role: member.role }));
      } catch (error) {
        console.log('err:', error)
      }
    }
  },
  mounted () {
    if (this.receiver) {
      this.getRoomMessages({ roomId: this.receiver }).then(this.scrollToEnd);
      this.getRoomInfo();
    }
  },
  watch: {
    receiver (newValue) {
      if (newValue) {
        this.getRoomMessages({ roomId: newValue }).then(this.scrollToEnd);
        this.getRoomInfo();
      }
    }
  },
  computed: {
    ...mapState('chat', ['roomMessages']),
    roomData () {
      return this.roomMessages[this.receiver] || []
    },
    messages () {
      return this.roomData?.messages || [];
    },
    receiverType () {
      return receiverTypes.ROOM
    },
    receiver () {
      return this.$route.params.roomId
    }
  },
}
</script>

<style lang="scss" scoped>
</style>