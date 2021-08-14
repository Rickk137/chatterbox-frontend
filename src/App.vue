<template>
  <v-app>
    <Snackbar />
    <router-view />
  </v-app>
</template>

<script>
import Snackbar from '@/components/common/Snackbar';

console.say = function () { }
export default {
  name: 'App',
  components: {
    Snackbar,
  },

};
</script>

<style lang="scss">
@import "./styles/main.scss";
@import "./styles/style.scss";
</style>
