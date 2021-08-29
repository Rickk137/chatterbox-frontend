<template>
  <v-app>
    <Snackbar />
    <router-view />
  </v-app>
</template>

<script>
import Snackbar from '@/components/common/Snackbar';

export default {
  name: 'App',
  components: {
    Snackbar,
  },

};
</script>

<style lang="scss">
@import "./assets/fonts/_iranyekan.scss";
@import "./styles/main.scss";
@import "./styles/style.scss";
</style>
