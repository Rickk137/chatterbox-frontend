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
    ></infinite-loading>
    <li
      v-for="(message, i) in messages"
      :key="message._id || i"
      :class="{other: userId !== message.author, self:  userId === message.author}"
    >{{message.content}}</li>
  </ul>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';


import { mapState } from 'vuex';

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
  padding: 14px;
  margin: 0 0 10px 0;
  font: 12px/16px "Noto Sans", sans-serif;
  border-radius: 10px;
  background-color: rgba(25, 147, 147, 0.2);
  word-wrap: break-word;
  max-width: 80%;
  min-width: 100px;
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
</style>