<template>
  <div class="chat-content">
    <div class="messages">
      <div class="message-container">
        <Messages
          :messages="messages"
          @loadMore="($state) => $emit('loadMore', $state)"
        />

        <div class="chat-form">
          <v-text-field
            class="mx-5 my-3 chat-form-tf"
            :label="`${$t('sendMessage')}...`"
            solo
            flat
            v-model="msginform"
            autocomplete="off"
            @keyup.enter="sendChat"
            @keypress="setCanMessageSubmit"
          >
          </v-text-field>
          <div class="submit-btn mx-8">

            <v-btn
              :disabled="!this.msginform"
              @click="sendChat"
              dark
              icon
            >
              <v-icon v-text="'mdi-send'"></v-icon>
            </v-btn>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Messages from '@/components/common/Messages.vue';

export default {
  props: {
    receiverType: {
      type: Number,
      required: true
    },
    receiver: {
      type: String,
      required: true
    },
    messages: {
      type: Array,
      default: () => ([])
    },
  },
  components: {
    Messages,
  },
  data () {
    return {
      chats: [],
      msginform: ""
    };
  },

  methods: {
    setCanMessageSubmit () {
      this.canMessageSubmit = true;
    },
    sendChat () {
      if (!this.msginform) return;

      this.$socket.emit('message', {
        content: this.msginform,
        receiver: this.receiver,
        type: this.receiverType
      })
      this.msginform = '';
      setTimeout(() => {
        this.$emit('scrollToEnd')
      }, 100)
    }
  }
};
</script>
