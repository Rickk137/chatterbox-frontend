<template>
  <v-btn
    dark
    icon
    @click="() => changeLanguage(locale === 'fa' ? 'en' : 'fa')"
  >
    {{locale === 'fa' ? 'En' : 'Fa' }}
  </v-btn>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  methods: {
    ...mapActions(['changeLanguage']),
  },
  computed: {
    ...mapState(['locale']),
  },
}
</script>

<style lang="scss" scoped>
</style>