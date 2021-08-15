<template>
  <div>
    <Chat
      :receiverType="receiverType"
      :receiver="receiver"
      :messages="messages"
    ></Chat>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { receiverTypes } from "@/constants/types";
import Chat from "@/components/Chat.vue";

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
  },
  mounted () {
    if (this.receiver)
      this.getPvMessages({ userId: this.receiver, page: 1 });
  },
  watch: {
    receiver (newValue,) {
      if (newValue)
        this.getPvMessages({ userId: newValue, page: 1 }).then(() => {
          const msgElement = document.getElementById("messages");
          msgElement.scrollTop = msgElement.scrollHeight;
        });
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