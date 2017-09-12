import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import alert from './components/alert'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.component('app-alert', alert);

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
  }
})
