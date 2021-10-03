<template>
  <v-card>
    <v-card-title class="text-h4 text-center mb-2">
      {{$t('createRoom')}}
    </v-card-title>
    <v-card-text>
      <v-form
        ref="signup"
        @submit.prevent="handleSignup"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :label="$t('name')"
          name="Name"
          dark
          prepend-icon="mdi-account"
          type="text"
          required
          :rules="required"
          color="teal primary"
        />
        <v-text-field
          v-model="family"
          :label="$t('family')"
          dark
          name="Family"
          prepend-icon="mdi-account"
          type="text"
          required
          :rules="required"
          color="teal primary"
        />
        <v-text-field
          v-model="username"
          :label="$t('username')"
          dark
          name="Username"
          prepend-icon="mdi-account"
          type="text"
          required
          :rules="required"
          color="teal primary"
        />
        <v-text-field
          v-model="email"
          :label="$t('email')"
          dark
          name="Email"
          prepend-icon="mdi-email"
          type="text"
          required
          :rules="emailRules"
          color="teal primary"
        />
      </v-form>

    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        @click="$emit('close')"
        v-t="'close'"
      />
      <v-btn
        color="blue darken-1"
        text
        :disabled="!valid"
        @click="handleSubmit"
        v-t="'save'"
      />

    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';

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
      email: '',
      username: '',
      name: '',
      family: '',
      valid: null,
      required: [
        v => !!v || this.$t('rules.required'),
      ],
      emailRules: [
        v => !!v || this.$t('rules.required'),
        v => /.+@.+\..+/.test(v) || this.$t('rules.notValid'),
      ],
    }
  },
  mounted () {
    this.name = this.user?.name
    this.family = this.user?.family
    this.username = this.user?.username
    this.email = this.user?.email
  },

  methods: {
    ...mapActions('auth', [
      'updateProfile',
    ]),

    handleSubmit () {
      if (this.$refs.signup.validate()) {
        const payload = {
          email: this.email,
          username: this.username,
          name: this.name,
          family: this.family,
        }
        this.updateProfile(payload);
      }
    },
    clear () {
      this.name = '';
      this.$refs.form.reset();
    },
  },
  computed: {
    ...mapState('auth', [
      'user',
    ]),
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