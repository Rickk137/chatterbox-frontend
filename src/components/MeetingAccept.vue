<template>
  <v-card>
    <!-- <v-card-title class="text-h5">
      Calling {{meetingDialog}}
    </v-card-title>
    <v-card-title class="text-h5">
      PeerId: {{myPeerId}}
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
      myPeerId: null,
      call: null,
      myStream: null,
    }
  },
  mounted () {
    this.$socket.emit('call-accepted', this.meetingDialog);

    this.myPeer = new Peer(this.userId, {
      host: '/',
      port: '3001'
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
        console.log('on call')
        //check if calling user is the same user id
        this.call = call;
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          this.addVideoStream(video, userVideoStream)
        })
      })

      this.connectToNewUser(this.meetingDialog, stream);
    })

    this.myPeer.on('open', id => {
      this.myPeerId = id;
    })
  },
  computed: {
    ...mapState(['meetingDialog', 'peerId']),
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
    connectToNewUser (peerId, stream) {
      const call = this.myPeer.call(peerId, stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        this.addVideoStream(video, userVideoStream);
      })
      call.on('close', () => {
        video.remove();
      })
    },
    addVideoStream (video, stream) {
      video.srcObject = stream
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
      this.$refs.videoGrid.append(video)
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