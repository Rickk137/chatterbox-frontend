<template>
  <v-content>
    <div class="dc-container">
      <Toolbar />

      <div class="base">
        <div class="base-content">
          <Sidebar class="hidden-sm-and-down"></Sidebar>

          <v-navigation-drawer
            class="hidden-md-and-up sidebar-in-drawer"
            v-model="leftDrawer"
            color="#1E1E1E"
            left
            dark
            absolute
          >
            <Sidebar></Sidebar>
          </v-navigation-drawer>

          <div class="chat">
            <v-card
              class="chat-header"
              tile
            >
              <div class="hidden-md-and-up">
                <div class="tool-icon mr-n4">
                  <v-app-bar-nav-icon
                    dark
                    @click.stop="leftDrawer = !leftDrawer"
                  />
                </div>
              </div>

              <div class="head-tools">

                <!-- <v-text-field
                  dark
                  flat
                  solo-inverted
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  label="Search"
                  class="hidden-sm-and-down mx-2 head-search"
                  autocomplete="off"
                ></v-text-field> -->

                <v-btn
                  dark
                  icon
                  @click="() => changeLanguage(lang === 'fa' ? 'en' : 'fa')"
                >
                  {{lang === 'fa' ? 'En' : 'Fa' }}
                </v-btn>

                <v-menu
                  bottom
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item @click="logout">
                      Logout
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-card>

            <router-view
              v-if="token"
              class="chat-screen"
            ></router-view>

          </div>
        </div>
      </div>
    </div>
    <AvatarChanger></AvatarChanger>
  </v-content>
</template>

<script>
import Toolbar from "@/components/Toolbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import AvatarChanger from "@/components/AvatarChanger";
import { mapActions, mapState } from 'vuex';
import i18n from "@/translation/i18n";
import { getLanguage } from "@/translation/i18n";

export default {
  name: "MainLayout",

  components: {
    Toolbar,
    Sidebar,
    AvatarChanger
  },
  data () {
    return {
      cache: 0,
      mini: true,
      leftDrawer: false,
      canMessageSubmit: false,
      lang: getLanguage()
    };
  },

  computed: {
    ...mapState('auth', ['token'])
  },

  methods: {
    ...mapActions('auth', [
      'logout',
    ]),

    changeLanguage (locale) {
      this.$vuetify.rtl = locale === 'fa';
      i18n.locale = locale;
      localStorage.setItem('lang', locale);
      this.lang = locale;
    },
  },
};
</script>

<style lang="scss"></style>
