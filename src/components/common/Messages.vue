<template>
  <ul
    id="messages"
    class="messages"
  >
    <infinite-loading
      v-if="messages.length"
      direction="top"
      spinner="circles"
      @infinite="($state) => $emit('loadMore', $state)"
    >

      <div slot="no-more"></div>
      <div slot="no-results"></div>

    </infinite-loading>
    <li
      v-for="(message, i) in messages"
      :key="message._id || i"
      :class="{other: userId !== message.author, self:  userId === message.author}"
    >
      <div v-if="!['IMAGE', 'FILE'].includes(message.contentType)">
        {{message.content}}
      </div>
      <div class="message-date">
        {{getDate(message.timestamp) | translateNumbers}}
      </div>
      <div v-if="message.contentType === 'IMAGE'">
        <img
          :src="getMediaLink(message)"
          style="max-width: 100%; max-width: 400px;"
        />
      </div>

      <div v-if="message.contentType === 'FILE'">

        <a
          target="_blank"
          :href="getMediaLink(message)"
        >
          {{getMediaLink(message)}}
        </a>
      </div>

    </li>
  </ul>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import { mapState } from 'vuex';
import { mediaURL } from "@/config";
import moment from 'jalali-moment'
import translateNumbers from "@/filters/translateNumbers";

export default {
  components: {
    InfiniteLoading,
  },
  props: {
    messages: {
      type: Array,
      default: () => ([])
    },
  },
  computed: {
    ...mapState('auth', [
      'user',
    ]),
    userId () {
      return this.user?.id
    }
  },
  filters: {
    translateNumbers
  },
  methods: {
    getMediaLink (message) {
      return `${mediaURL}media/${message.content}`
    },
    getDate (date) {
      return moment(new Date(date),).locale('fa')
        .format('HH:mm - MM/DD');
    }
  },
}
</script>

<style lang="scss" scoped>
.messages {
  padding: 10px;
  margin: 0;
  list-style: none;
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;
  border-radius: 4px;
  background: transparent;
  display: flex;
  flex-direction: column;
}

.messages li {
  position: relative;
  clear: both;
  display: inline-block;
  padding: 10px 10px 25px 10px;
  margin: 0 0 10px 0;
  border-radius: 10px;
  background-color: rgba(25, 147, 147, 0.2);
  word-wrap: break-word;
  max-width: 80%;
  min-width: 140px;
  font-size: 14px;
}

.messages li.self {
  animation: show-chat-even 0.15s 1 ease-in;
  -moz-animation: show-chat-even 0.15s 1 ease-in;
  -webkit-animation: show-chat-even 0.15s 1 ease-in;
  align-self: flex-end;
  text-align: right;
  color: #0ec879;
}
.messages li.other {
  animation: show-chat-odd 0.15s 1 ease-in;
  -moz-animation: show-chat-odd 0.15s 1 ease-in;
  -webkit-animation: show-chat-odd 0.15s 1 ease-in;
  color: #0ad5c1;
  align-self: flex-start;
}

.message-date {
  position: absolute;
  bottom: 0px;
  font-size: 11px;
}

.messages li.other .message-date {
  left: initial;
  right: 8px;
}
.messages li.self .message-date {
  right: initial;
  left: 8px;
}

.v-application.v-application--is-rtl {
  .messages li.other {
    text-align: right;
  }

  .messages li.self {
    text-align: left;
  }
  .messages li.other .message-date {
    right: initial;
    left: 8px;
  }
  .messages li.self .message-date {
    left: initial;
    right: 8px;
  }
}
</style>