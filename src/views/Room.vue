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
      <Members></Members>
    </div>

    <v-navigation-drawer
      class="hidden-md-and-up"
      v-model="drawer"
      color="#1E1E1E"
      right
      dark
      absolute
    >
      <Members></Members>
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
    }
  },
  components: {
    Chat,
    Members,
  },
  methods: {
    ...mapActions('chat', ['getRoomMessages']),
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
    }
  },
  mounted () {
    if (this.receiver) {
      this.getRoomMessages({ roomId: this.receiver }).then(this.scrollToEnd);
    }
  },
  watch: {
    receiver (newValue) {
      if (newValue)
        this.getRoomMessages({ roomId: newValue }).then(this.scrollToEnd);
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