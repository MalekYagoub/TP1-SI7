<template>
  <v-app>
    <v-toolbar class="primary">
      <v-toolbar-title><img src="./assets/maPresse.png" class="logo"> <!--Ma presse --></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
    <v-footer class="pa-3 grey lighten-1" fixed>
      <v-spacer></v-spacer>
      <div>© {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
  }
</script>

<style lang="stylus">
  @import './stylus/main'

  img
    margin-top: 5px

  body, *, html
    overflow: hidden
</style>
