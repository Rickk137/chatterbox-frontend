<template>
  <div>
    <v-dialog
      v-model="showDialog"
      persistent
      dark
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{callingDialog}} is Calling you
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="darken-1"
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
          this.setCallingDialog({ userId: null, peerId: null })
      }
    }
  },
  methods: {
    ...mapMutations([
      'setCallingDialog',
      'setMeetingStatus',
      'setMeetingDialog',
    ]),
    accept () {
      this.setMeetingStatus('INCOMING');
      this.setMeetingDialog(this.callingDialog);
      this.showDialog = false;
    }
  },
}
</script>

<style lang="scss" scoped>
</style>