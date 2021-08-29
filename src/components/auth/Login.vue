<template>
  <v-row style="min-height: 552px;">
    <LanguageSwitch class="lang-switcher" />

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

        <v-form
          ref="form"
          @submit.prevent="handleLogin"
          v-model="valid"
          lazy-validation
        >

          <v-text-field
            v-model="email"
            :label="$t('email')"
            :rules="emailRules"
            name="Email"
            prepend-icon="mdi-email"
            type="text"
            required
            color="teal primary"
          />

          <v-text-field
            v-model="password"
            id="password"
            :rules="passwordRules"
            :label="$t('Password')"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
            required
            color="teal primary"
          />
        </v-form>
        <!-- <h3
          class="text-center mt-4"
          v-t="'forgotPassword'"
        ></h3> -->
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
import LanguageSwitch from "@/components/common/LanguageSwitch.vue";
import { mapActions } from 'vuex';

export default {
  components: {
    LanguageSwitch,
  },
  data () {
    return {
      valid: false,
      email: '',
      password: '',
      emailRules: [
        v => !!v || this.$t('rules.required'),
        v => /.+@.+\..+/.test(v) || this.$t('rules.notValid'),
      ],
      passwordRules: [
        v => !!v || this.$t('rules.required'),
        v => (v && v.length >= 6) || this.$t('rules.minCharacters', { count: 6 }),
      ],
    }
  },
  methods: {
    ...mapActions('auth', [
      'login',
    ]),
    handleLogin () {
      if (this.$refs.form.validate()) {
        this.login({ email: this.email, password: this.password });
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.lang-switcher {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
.v-application--is-rtl .lang-switcher {
  left: 0;
  right: unset;
}
</style>