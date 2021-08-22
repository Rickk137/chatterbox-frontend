<template>
  <v-row class="fill-height">
    <v-col
      cols="12"
      md="5"
      class="teal primary"
    >
      <v-card-text class="white--text mt-12">
        <h1
          class="text-center display-1"
          v-t="'welcome'"
        ></h1>
        <h5
          class="text-center"
          v-t="'signInText'"
        ></h5>
      </v-card-text>
      <div class="text-center">
        <v-btn
          large
          outlined
          dark
          @click="$emit('login')"
          v-t="'signIn'"
        />
      </div>
    </v-col>

    <v-col
      cols="12"
      md="7"
      class="mb-10"
    >
      <v-card-text class="mt-12">
        <h1
          class="text-center teal--text text--primary mb-4"
          v-t="'createAccount'"
        ></h1>

        <v-form>
          <v-text-field
            v-model="name"
            :label="$t('name')"
            name="Name"
            prepend-icon="mdi-account"
            type="text"
            color="teal primary"
          />
          <v-text-field
            v-model="family"
            :label="$t('family')"
            name="Family"
            prepend-icon="mdi-account"
            type="text"
            color="teal primary"
          />
          <v-text-field
            v-model="username"
            :label="$t('username')"
            name="Username"
            prepend-icon="mdi-account"
            type="text"
            color="teal primary"
          />
          <v-text-field
            v-model="email"
            :label="$t('email')"
            name="Email"
            prepend-icon="mdi-email"
            type="text"
            color="teal primary"
          />

          <v-text-field
            v-model="password"
            id="password"
            :label="$t('password')"
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
          v-t="'signUp'"
        />
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