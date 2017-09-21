<template>
  <v-app>
    <header>
      <v-toolbar class="primary">
        <v-toolbar-title><img src="./assets/maPresse.png" class="logo"> <!--Ma presse --></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn flat router to="/articles">
            <v-icon left>new_releases</v-icon>
            Articles
          </v-btn>
          <v-btn flat router v-if="$store.getters.user"  to="/userArticles">
            <v-icon left>star</v-icon>
            Mes articles
          </v-btn>
          <v-btn flat router v-if="!$store.getters.user" to="/signin">
            <v-icon left>face</v-icon>
            Connexion
          </v-btn>
          <v-btn flat router v-if="!$store.getters.user" to="/signup">
            <v-icon left>lock_open</v-icon>
            Inscription
          </v-btn>
          <v-btn flat router v-if="$store.getters.user" @click.native="$store.dispatch('logout');">
            <v-icon left>exit_to_app</v-icon>
            Déconnexion
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    <typesActus></typesActus>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <v-footer class="pa-3 grey lighten-1 hidden-md-and-down" fixed>
      <v-spacer></v-spacer>
      <div>© {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>

  import typesActus from './components/typesActus'

  export default {
    mounted () {
      this.$router.push('/articles');
    },
    components: {
      typesActus
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
