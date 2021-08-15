<template>
  <v-dialog
    v-model="showDialog"
    max-width="600px"
    dark
  >

    <v-card>
      <v-card-title class="text-h4 text-center mb-2">
        Create Room
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >

          <v-text-field
            v-model="name"
            :counter="20"
            :rules="nameRules"
            label="Room Name"
            required
            prepend-icon="mdi-book-multiple-outline"
          ></v-text-field>

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="$emit('close')"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          :disabled="!valid"
          @click="handleSubmit"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    roomId: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
    }
  },
  methods: {
    ...mapMutations([
      'showSnackbar',
    ]),
    ...mapMutations('chat', [
      'ADD_ROOM',
    ]),
    async handleSubmit () {
      if (this.$refs.form.validate()) {
        try {
          if (this.updateForm) {
            console.log('salam')
          } else {

            const { data } = await this.axios.post("rooms", { name: this.name });

            this.$socket.emit('join-room');

            this.ADD_ROOM(data);
            this.showSnackbar({ content: 'Room added', color: 'success' });
          }
          this.clear();
          this.$emit('close');
        } catch (error) {
          console.log('error:', error)
        }
      }

    },
    clear () {
      this.name = '';
      this.$refs.form.reset();
    },
  },
  computed: {
    updateForm () {
      return !!this.roomId;
    },
    showDialog: {
      get: function () {
        return this.show
      },
      set: function (newValue) {
        if (!newValue)
          this.$emit('close')
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>