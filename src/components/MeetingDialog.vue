<template>
  <div>
    <v-dialog
      v-model="showDialog"
      persistent
      dark
    >
      <div v-if="showDialog">

        <Meeting
          v-if="meetingStatus !== 'INCOMING'"
          @close="() => showDialog = false"
        />
        <MeetingAccept
          v-if="meetingStatus === 'INCOMING'"
          @close="() => showDialog = false"
        />
      </div>
    </v-dialog>
  </div>
</template>

<script>
import MeetingAccept from './MeetingAccept.vue';
import Meeting from './Meeting.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    Meeting,
    MeetingAccept
  },
  computed: {
    ...mapState(['meetingDialog', 'meetingStatus']),
    showDialog: {
      get: function () {
        return !!this.meetingDialog
      },
      set: function (newValue) {
        if (!newValue)
          this.setMeetingDialog(null)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setMeetingDialog',
    ]),
  },
}
</script>

<style lang="scss" scoped>
</style>