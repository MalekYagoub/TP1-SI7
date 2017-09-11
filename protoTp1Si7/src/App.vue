<template>
  <v-app>
    <v-toolbar class="red accent-2">
      <v-toolbar-title><img src="./assets/maPresse.png" class="logo"></v-toolbar-title>
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
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'

  img
    margin-top: 5px

  body, *, html
    overflow: hidden
</style>
