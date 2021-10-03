<template>
  <v-card>
    <!-- <v-card-title class="text-h5">
      Calling {{meetingDialog}}
    </v-card-title>
    <v-card-title class="text-h5">
      peerId: {{peerId}}
    </v-card-title> -->

    <v-card-title class="text-h5 justify-center">
      تماس
    </v-card-title>

    <div
      class="mt-4"
      ref="videoGrid"
      id="video-grid"
    />
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        class="red"
        icon
        x-large
        @click="close"
      >
        <v-icon
          size="25"
          class="icon"
        >
          mdi-close
        </v-icon>
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import Peer from 'peerjs';

export default {
  data () {
    return {
      myPeer: null,
      peerId: null,
      call: null,
      myStream: null,
    }
  },
  mounted () {
    this.myPeer = new Peer(this.userId, {
      host: 'https://young-ocean-37802.herokuapp.com/',
      port: 443,
      path: '/myapp',
      secure: true,
    })
    const myVideo = document.createElement('video')
    myVideo.muted = true

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      this.myStream = stream;
      this.addVideoStream(myVideo, stream)

      this.myPeer.on('call', call => {
        console.log("On Call meeeting")
        this.onCall(call, stream);
      })

    })

    this.myPeer.on('open', id => {
      this.peerId = id;
    })

    this.$socket.emit('call', {
      userId: this.meetingDialog,
      peerId: this.meetingDialog,
      name: this.user.name,
      family: this.user.family,
      usename: this.user.usename,
    })

  },
  computed: {
    ...mapState(['meetingDialog']),
    ...mapState('auth', [
      'user',
    ]),
    userId () {
      return this.user?.id
    },
  },
  methods: {
    stopStreamedVideo () {
      const tracks = this.myStream.getTracks();
      tracks.forEach(function (track) {
        track.stop();
      });
    },
    onCall (call, stream) {
      //check if calling user is the same user id

      this.call = call;
      call.answer(stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        this.addVideoStream(video, userVideoStream)
      })

    },
    addVideoStream (video, stream) {
      video.srcObject = stream
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
      this.$refs.videoGrid?.append(video)
    },
    close () {
      this.stopStreamedVideo();
      this.call?.close();
      this.myPeer.disconnect();
      this.$socket.emit('reject', this.meetingDialog)
      this.$emit('close');
    }
  },

  beforeDestroy () {
    this.stopStreamedVideo();
    this.call?.close();
    this.myPeer.disconnect();
  }
}
</script>

<style lang="scss">
</style>