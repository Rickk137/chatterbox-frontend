<template>
  <v-row class="fill-height">
    <v-col
      cols="12"
      md="5"
      class="teal primary"
    >
      <v-card-text class="white--text mt-12">
        <h1 class="text-center display-1">Welcome Back!</h1>
        <h5 class="text-center">To Keep connected with us please login with your personnel info</h5>
      </v-card-text>
      <div class="text-center">
        <v-btn
          large
          outlined
          dark
          @click="$emit('login')"
        >Sign in</v-btn>
      </div>
    </v-col>

    <v-col
      cols="12"
      md="7"
      class="mb-10"
    >
      <v-card-text class="mt-12">
        <h1 class="text-center display-2 teal--text text--primary">Create Account</h1>

        <v-form>
          <v-text-field
            v-model="name"
            label="Name"
            name="Name"
            prepend-icon="mdi-account"
            type="text"
            color="teal primary"
          />
          <v-text-field
            v-model="family"
            label="Family"
            name="Family"
            prepend-icon="mdi-account"
            type="text"
            color="teal primary"
          />
          <v-text-field
            v-model="username"
            label="Username"
            name="Username"
            prepend-icon="mdi-account"
            type="text"
            color="teal primary"
          />
          <v-text-field
            v-model="email"
            label="Email"
            name="Email"
            prepend-icon="mdi-email"
            type="text"
            color="teal primary"
          />

          <v-text-field
            v-model="password"
            id="password"
            label="Password"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
            color="teal primary"
          />
        </v-form>
      </v-card-text>
      <div class="text-center mt-n5">
        <v-btn
          large
          color="teal primary"
          dark
          @click="handleSignup"
        >SIGN UP</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      email: 'peymannaderi3@gmail.com',
      username: 'username',
      name: 'name',
      family: 'family',
      password: '123456'
    }
  },
  methods: {
    ...mapActions('auth', [
      'signup',
    ]),
    handleSignup () {
      const payload = {
        email: this.email,
        username: this.username,
        name: this.name,
        family: this.family,
        password: this.password
      }
      this.signup(payload);
    }
  },
}
</script>

<style lang="scss" scoped>
</style>