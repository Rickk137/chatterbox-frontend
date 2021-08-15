<template>
  <div>
    <Chat
      :receiverType="receiverType"
      :receiver="receiver"
      :messages="messages"
      @loadMore="loadMore"
      @scrollToEnd="scrollToEnd"
    ></Chat>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { receiverTypes } from "@/constants/types";
import Chat from "@/components/Chat.vue";
import { LIMIT } from "@/constants/types";

export default {
  name: "Users",

  data () {
    return {
      drawer: false,
    }
  },
  components: {
    Chat,
  },
  methods: {
    ...mapActions('chat', ['getPvMessages']),
    loadMore ($state) {
      this.getPvMessages({ userId: this.receiver, loadMore: true }).then((data) => {
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
    if (this.receiver)
      this.getPvMessages({ userId: this.receiver }).then(this.scrollToEnd);
  },
  watch: {
    receiver (newValue,) {
      if (newValue)
        this.getPvMessages({ userId: newValue }).then(this.scrollToEnd);
    }
  },
  computed: {
    ...mapState('chat', ['pvMessages']),
    pvData () {
      return this.pvMessages[this.receiver] || []
    },
    messages () {
      return this.pvData?.messages || [];
    },
    receiverType () {
      return receiverTypes.USER
    },
    receiver () {
      return this.$route.params.userId
    }
  },
}
</script>

<style lang="scss" scoped>
</style>