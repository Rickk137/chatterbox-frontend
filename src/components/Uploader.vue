<template>
  <div>
    <v-btn
      color="white"
      dark
      icon
      @click="selectFile"
    >
      <v-icon size="30">mdi-paperclip</v-icon>
    </v-btn>
    <input
      v-show="false"
      type="file"
      @change="upload"
      ref="file-target"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    selectFile () {
      this.$refs['file-target'].click();
    },
    async upload (e) {

      const file = e.target.files[0]
      if (!file) return

      const formData = new FormData()
      formData.append('file', file)
      try {
        const { data } = await axios.post("/media/upload", formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        console.log('data: ', data)
        if (data?.file) {
          this.$emit('input', data.file)
        }

      } catch (error) {
        console.log('error:', error)
      }
      e.target.value = ''
    }
  },
}
</script>

<style lang="scss" scoped>
</style>