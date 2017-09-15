import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import alert from './components/shared/alert'
import info from './components/shared/info'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.component('app-alert', alert);
Vue.component('app-info', info);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
  	firebase.initializeApp({
  		apiKey: "AIzaSyDWYrBWIe0vKhOn805ePBwQg9kGi902psE",
	    authDomain: "tp1si7-7a3c6.firebaseapp.com",
	    databaseURL: "https://tp1si7-7a3c6.firebaseio.com",
	    projectId: "tp1si7-7a3c6",
	    storageBucket: "tp1si7-7a3c6.appspot.com"
	  })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('user', {id: user.uid, email: user.email, registeredArticles: []})
      }
    });
  }
})
