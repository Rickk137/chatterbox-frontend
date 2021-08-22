<template>
  <div>
    <v-dialog
      v-model="showDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{callingDialog}} is Calling you
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="showDialog = false"
          >
            Reject
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="accept"
          >
            Answer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['callingDialog']),
    showDialog: {
      get: function () {
        return !!this.callingDialog
      },
      set: function (newValue) {
        if (!newValue)
          this.setCallingDialog(null)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setCallingDialog',
    ]),
    accept () {
      const link = '/call/' + this.callingDialog + '/accept';
      this.showDialog = false;
      this.$router.push(link);
    }
  },
}
</script>

<style lang="scss" scoped>
</style>