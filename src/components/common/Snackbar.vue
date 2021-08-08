<template>
  <v-snackbar
    v-model="show"
    :color="color"
    multi-line
  >
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn
        icon
        small
        v-bind="attrs"
        @click="show = false"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data () {
    return {
      message: '',
      color: '',
    }
  },
  methods: {
    ...mapMutations([
      'showSnackbar',
    ]),
  },
  computed: {
    ...mapState(['snackbar'],),
    show: {
      get: function () {
        return this.message
      },
      set: function (newValue) {
        if (!newValue) {
          this.showSnackbar(null)
        }
      }
    }
  },
  watch: {
    snackbar (snackbar) {
      if (snackbar) {
        this.message = snackbar.content
        this.color = snackbar.color
      } else {
        this.message = '';
        this.color = ''
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>