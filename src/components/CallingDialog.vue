<template>
  <div>
    <v-dialog
      v-model="showDialog"
      persistent
      dark
      max-width="390"
    >
      <v-card class="pb-5">
        <v-card-title
          v-if="showDialog"
          class="text-h5 flex items-center justify-center"
        >
          {{title}}
        </v-card-title>
        <div class="content-center">
          <div class="pulse">
          </div>
        </div>
        <v-btn
          class="green ma-4"
          icon
          x-large
          @click="accept"
        >
          <v-icon
            size="25"
            class="icon"
          >
            mdi-phone
          </v-icon>
        </v-btn>

        <v-btn
          class="red ma-4"
          icon
          x-large
          @click="reject"
        >
          <v-icon
            size="25"
            class="icon"
          >
            mdi-close
          </v-icon>
        </v-btn>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['callingDialog', 'meetingInfo']),
    showDialog: {
      get: function () {
        return !!this.meetingInfo
      },
      set: function (newValue) {
        if (!newValue) {
          this.setCallingDialog({ userId: null, peerId: null })
          this.setMeetingInfo(null)
        }
      }
    },
    title () {
      return `${this.meetingInfo?.name} ${this.meetingInfo?.family}`
    }
  },
  methods: {
    ...mapMutations([
      'setCallingDialog',
      'setMeetingStatus',
      'setMeetingDialog',
      'setMeetingInfo',
    ]),
    accept () {
      this.setMeetingStatus('INCOMING');
      this.setMeetingDialog(this.callingDialog);
      this.showDialog = false;
    },
    reject () {
      this.$socket.emit('reject', this.meetingInfo.userId)
      this.showDialog = false
    }
  },

}
</script>

<style lang="scss" scoped>
.content-center {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pulse i {
  color: #fff;
}

.pulse {
  height: 100px;
  width: 100px;
  background-color: orange;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.pulse::before {
  content: "";
  position: absolute;
  border: 1px solid orange;
  width: calc(100% + 40px);
  height: calc(100% + 40px);
  border-radius: 50%;
  animation: pulse 1s linear infinite;
}

.pulse::after {
  content: "";
  position: absolute;
  border: 1px solid ORANGE;
  width: calc(100% + 40px);
  height: calc(100% + 40px);
  border-radius: 50%;
  animation: pulse 1s linear infinite;
  animation-delay: 0.3s;
}

@keyframes pulse {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(1.3);
    opacity: 0;
  }
}
</style>