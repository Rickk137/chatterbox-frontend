<template>
  <div class="chat-screen">
    <div class="messages px-6 pt-10">
      <div>
        {{userCount}}
      </div>

      <div>
        Calling : {{userId}}
      </div>

      <div
        class="mt-4"
        ref="videoGrid"
        id="video-grid"
      />

    </div>
  </div>
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
      userCount: 0
    }
  },
  mounted () {
    this.myPeer = new Peer(this.myId, {
      host: '/',
      port: '3001'
    })
    const myVideo = document.createElement('video')
    myVideo.muted = true

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      this.addVideoStream(myVideo, stream)

      this.myPeer.on('call', call => {
        this.onCall(call, stream);

      })

    })

    this.myPeer.on('open', id => {
      this.peerId = id;
    })

    this.$socket.emit('call', this.userId)

  },

  computed: {
    ...mapState('auth', [
      'user',
    ]),
    myId () {
      return this.user?.id
    },
    userId () {
      return this.$route.params.userId
    }
  },

  methods: {
    onCall (call, stream) {
      //check if calling user is the same user id

      if (this.userCount < 2) {
        this.call = call;
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          this.addVideoStream(video, userVideoStream)
        })
      }
    },
    addVideoStream (video, stream) {
      video.srcObject = stream
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
      this.$refs.videoGrid.append(video)
      this.userCount = this.$refs.videoGrid.children.length;
    }
  },
  beforeDestroy () {
    this.call?.close();
  }
}
</script>

<style lang="scss" >
.share-link {
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
}
#video-grid {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(1, 500px);
  grid-auto-rows: 500px;
  gap: 8px;
  width: 100%;
  video {
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 10px;
    overflow: hidden;
  }
}
</style>