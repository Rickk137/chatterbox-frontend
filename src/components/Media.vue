<template>
  <div v-if="filename">

    <div v-if="contentType === 'IMAGE'">
      <img
        :src="link"
        style="max-width: 100%; max-width: 400px;"
      />

    </div>

    <div v-if="contentType === 'AUDIO'">
      <vue-plyr>
        <audio
          controls
          crossorigin
          playsinline
        >
          <source
            :src="link"
            type="audio/mp3"
          />
          <source
            :src="link"
            type="audio/ogg"
          />
        </audio>
      </vue-plyr>

    </div>

    <div v-if="contentType === 'VIDEO'">
      <vue-plyr>
        <video
          controls
          crossorigin
          playsinline
        >
          <source
            :src="link"
            type="video/mp4"
          />
        </video>
      </vue-plyr>

    </div>

    <div v-if="contentType === 'FILE'">

      <a
        target="_blank"
        :href="link"
      >
        {{link}}
      </a>
    </div>
  </div>
</template>

<script>
import { mediaURL } from '@/config';

export default {
  props: {
    filename: {
      type: String,
      default: ''
    },
    contentType: {
      type: String,
      default: ''
    },
  },
  computed: {
    link () {
      return `${mediaURL}media/${this.filename}`
    },
  },
}
</script>

<style lang="scss" scoped>
</style>