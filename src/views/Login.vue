<template>
  <v-app
    id="inspire"
    style="background: #1e1e1e !important;"
  >
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="8"
            style="max-width: 1000px;"
          >
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <Login @signUp="() => step = 2" />
                </v-window-item>
                <v-window-item :value="2">
                  <Signup @login="() => step = 1" />
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Login from '@/components/auth/Login';
import Signup from '@/components/auth/Signup';

export default {
  data () {
    return {
      step: 1,
    }
  },
  components: {
    Login,
    Signup
  },

};
</script>