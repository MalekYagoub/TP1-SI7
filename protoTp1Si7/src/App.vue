<template>
  <v-app>
    <v-navigation-drawer
      temporary
      v-model="sideNav"
      light
      overflow
    >
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile @click="$router.push('/articles')">
          <v-list-tile-action>
            <v-icon>new_releases</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Articles</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="$store.getters.user" @click="goUserArticles">
          <v-list-tile-action>
            <v-icon>star</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mes articles</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!$store.getters.user" @click="$router.push('/signin')">
          <v-list-tile-action>
            <v-icon>face</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Connexion</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!$store.getters.user" @click="$router.push('/signup')">
          <v-list-tile-action>
            <v-icon>lock_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Inscription</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="$store.getters.user" @click="$store.dispatch('logout', {$router: $router})">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Déconnexion</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>


    <header>
      <v-toolbar class="primary">
        <v-toolbar-side-icon dark @click.native.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">Ma presse</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn flat dark router to="/articles">
            <v-icon left>new_releases</v-icon>
            <span class="white--text">Articles</span>
          </v-btn>
          <v-btn flat dark router v-if="$store.getters.user"  @click.native="goUserArticles">
            <v-icon left>star</v-icon>
            <span class="white--text">Mes articles</span>
          </v-btn>
          <v-btn flat dark router v-if="!$store.getters.user" to="/signin">
            <v-icon left>face</v-icon>
            <span class="white--text">Connexion</span>
          </v-btn>
          <v-btn flat dark router v-if="!$store.getters.user" to="/signup">
            <v-icon left>lock_open</v-icon>
            <span class="white--text">Inscription</span>
          </v-btn>
          <v-btn flat dark router v-if="$store.getters.user" @click.native="$store.dispatch('logout', {$router: $router});">
            <v-icon left>exit_to_app</v-icon>
            <span class="white--text">Déconnexion</span>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    <typesActus class="greyBackground" v-if="$route.path === '/articles'"></typesActus>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>

  import typesActus from './components/typesActus'

  export default {
    mounted () {
      this.$router.push('/articles');
    },
    data () {
      return {
        sideNav: false
      }
    },
    components: {
      typesActus
    },
    methods: {
      goUserArticles () {
        this.$router.push('userArticles');
        scroll(0,0);
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'

  img
    margin-top: 5px

  header {
    position: fixed;
    top: 0;
  }

  main {
    margin-top: 170px;
  }
</style>
