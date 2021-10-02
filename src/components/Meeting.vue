<template>
  <v-card>
    <v-card-title class="text-h5">
      Calling {{meetingDialog}}
    </v-card-title>
    <v-card-title class="text-h5">
      peerId: {{peerId}}
    </v-card-title>

    <div
      class="mt-4"
      ref="videoGrid"
      id="video-grid"
    />
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        text
        dark
        @click="close"
      >
        Close
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
      console.log('addVideoStream: ', { video, stream })
      console.log('this.$refs.videoGrid: ', this.$refs.videoGrid)
      this.$refs.videoGrid?.append(video)
    },
    close () {
      this.stopStreamedVideo();
      this.call?.close();
      this.$emit('close');
      this.myPeer.disconnect();
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
#video-grid {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(1, 500px);
  grid-auto-rows: 500px;
  gap: 8px;
  width: 100%;
  video {
    height: 300px;
    width: 300px;
    object-fit: cover;
    border-radius: 10px;
    overflow: hidden;
  }
}
</style>