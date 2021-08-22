<template>
  <v-row style="min-height: 552px;">
    <v-col
      class="fill-height"
      cols="12"
      md="7"
      align="center"
      justify="center"
    >
      <v-card-text class="mt-12">
        <h1
          class="text-center teal--text text--primary mb-5"
          v-t="'signIn'"
        ></h1>

        <v-form>
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
            :label="$t('Password')"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
            color="teal primary"
          />
        </v-form>
        <h3
          class="text-center mt-4"
          v-t="'forgotPassword'"
        ></h3>
      </v-card-text>
      <div class="text-center mt-3">
        <v-btn
          color="teal primary"
          dark
          large
          @click="handleLogin"
          v-t="'signIn'"
        />
      </div>
    </v-col>
    <v-col
      cols="12"
      md="5"
      class="primary"
    >
      <v-card-text class="white--text mt-12">
        <h1
          class="text-center display-1"
          v-t="'welcome'"
        ></h1>
        <h5
          class="text-center"
          v-t="'signUpText'"
        ></h5>
      </v-card-text>
      <div class="text-center">
        <v-btn
          large
          outlined
          dark
          @click="$emit('signUp')"
          v-t="'signup'"
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
      password: '123456'
    }
  },
  methods: {
    ...mapActions('auth', [
      'login',
    ]),
    handleLogin () {
      this.login({ email: this.email, password: this.password });
    }
  },
}
</script>

<style lang="scss" scoped>
</style>