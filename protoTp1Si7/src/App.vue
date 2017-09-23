<template>
  <v-app>
    <header>
      <v-toolbar class="primary">
        <v-toolbar-title><img src="./assets/maPresse.png" class="logo"> <!--Ma presse --></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
        </v-toolbar-items>
      </v-toolbar>
      <typesActus></typesActus>
    </header>
    
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>

  import typesActus from './components/typesActus';

  export default {
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
    margin-top: 200px;
  }

  html {
    background-color: #fafafa;
  }
</style>
