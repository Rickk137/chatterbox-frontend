<template>
  <v-dialog
    v-model="showDialog"
    max-width="600px"
    dark
  >

    <v-card>
      <v-card-title>
        <span class="text-h5">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
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
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
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
          const { data } = await this.axios.post("rooms", { name: this.name });

          this.ADD_ROOM(data);
          this.showSnackbar({ content: 'Room added', color: 'success' });

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