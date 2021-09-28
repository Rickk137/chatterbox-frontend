<template>
  <div v-if="file">

    <img
      v-if="isImage"
      :src="link"
      class="mb-2"
      style="max-width: 100%;"
    />

    <a
      target="_blank"
      :href="link"
    >
      {{link}}
    </a>
  </div>
</template>

<script>
import { baseURL } from '@/config';

export default {
  props: {
    file: {
      type: Object,
      default: null
    },

  },
  computed: {
    link () {
      return `${baseURL}media/${this.file?.filename}`
    },
    isImage () {
      return this.file?.mimetype?.includes('image');
    }
  },
}
</script>

<style lang="scss" scoped>
</style>