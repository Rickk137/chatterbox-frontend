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
            @keyup.enter="sendTextMessage"
            @keypress="setCanMessageSubmit"
          >
          </v-text-field>
          <div class="submit-btn mx-8">

            <Uploader v-model="file" />

            <v-btn
              :disabled="!this.msginform"
              @click="sendTextMessage"
              dark
              icon
            >
              <v-icon v-text="'mdi-send'"></v-icon>
            </v-btn>

          </div>
        </div>
      </div>
    </div>

    <v-dialog
      @input="file = null"
      :value="!!file"
      max-width="600px"
      dark
      persistent
    >
      <v-card
        dark
        flat
        tile
        width="100%"
        height="100%"
        class="pa-5"
      >

        <v-card-text>
          <p class="mb-5">
            آیا از ارسال این فایل اطمینان دارید؟
          </p>
          <Media
            v-if="file"
            :filename="file.filename"
            :contentType="getContentType(file.mimetype)"
            showlink
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="file = null"
            v-t="'close'"
          />
          <v-btn
            color="blue darken-1"
            text
            :disabled="!file"
            @click="sendFile"
            v-t="'send'"
          />

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Media from "@/components/Media.vue";
import Uploader from "@/components/Uploader.vue";
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
    Uploader,
    Media
  },
  data () {
    return {
      chats: [],
      msginform: "",
      file: null
    };
  },

  methods: {
    setCanMessageSubmit () {
      this.canMessageSubmit = true;
    },
    sendTextMessage () {
      if (!this.msginform) return;

      this.sendChat({
        content: this.msginform,
      });
      this.msginform = '';
    },
    sendChat (msg) {

      this.$socket.emit('message', {
        receiver: this.receiver,
        type: this.receiverType,
        ...msg
      })

      setTimeout(() => {
        this.$emit('scrollToEnd')
      }, 100)
    },
    getContentType (mimetype) {
      if (!mimetype) return 'FILE';
      if (mimetype?.includes('image'))
        return 'IMAGE'
      if (mimetype?.includes('audio'))
        return 'AUDIO'
      if (mimetype?.includes('video'))
        return 'VIDEO'
      return 'FILE'

    },
    sendFile () {
      this.sendChat({
        content: this.file?.filename,
        contentType: this.getContentType(this.file?.mimetype)
      });
      this.file = null;
    }
  }
};
</script>
