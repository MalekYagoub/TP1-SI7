import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		activeTypeActus: '',
		activeNewspaper: '',
		articles: undefined,
		user: undefined,
		error: null,
		userSignedUp: false,
		loading: false,
		loadingArticles: false
	},
	actions: {
		getArticles: ({state, commit}, payload) => {
			commit('loadingArticles', true);
			axios.get('http://localhost:3000/getArticles/' + payload).then((response) => {
				response.data.sort((a, b) => {
					return new Date(Date.parse(b.published)) - new Date(Date.parse(a.published));
				});
				commit('articles', response.data);
				commit('loadingArticles', false);
			});
		},
		signUserUp: ({commit}, payload) => {
			commit('error', null);
			commit('loading', true);
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
				.then(
					user => {
						commit('loading', false);
						commit('userSignedUp', true);
					}
				)
				.catch(
					error => {
						commit('loading', false);
						commit('error', error);
					}
				)
		},
		signUserIn: ({commit}, payload) => {
			commit('error', null);
			commit('loading', true);
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
				.then(
					user => {
						commit('loading', false);
						const userSignedIn = {
							id: user.uid,
							email: user.email,
							registeredArticles: []

						}
						commit('user', userSignedIn);
					}
				)
				.catch(
					error => {
						commit('loading', false);
						commit('error', error);
					}
				)
		}
	},
	mutations: {
		activeTypeActus: (state, payload) => {
			state.activeTypeActus = payload;
		},
		activeNewspaper: (state, payload) => {
			state.activeNewspaper = payload;
		},
		articles: (state, payload) => {
			state.articles = payload;
		},
		user: (state, payload) => {
			state.user = payload;
		},
		error: (state, payload) => {
			state.error = payload;
		},
		userSignedUp: (state, payload) => {
			state.userSignedUp = payload;
		},
		loading: (state, payload) => {
			state.loading = payload;
		},
		loadingArticles: (state, payload) => {
			state.loadingArticles = payload;
		}

	},
	getters: {
		activeTypeActus: state => state.activeTypeActus,
		activeNewspaper: state => state.activeNewspaper,
		articles: state => state.articles,
		user: state => state.user,
		error: state => state.error,
		userSignedUp: state => state.userSignedUp,
		loading: state => state.loading,
		loadingArticles: state => state.loadingArticles
	}
});