<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>

console.say = function () { }
export default {
  name: 'App',
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    message: function () {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },

};
</script>

<style lang="scss">
@import "./styles/main.scss";
@import "./styles/style.scss";
</style>
