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
		loadingArticles: false,
		showUserArticles: 0
	},
	actions: {
		getArticles: ({state, commit}, payload) => {
			commit('loadingArticles', true);
			axios.get('http://localhost:3000/getArticles/' + payload).then((response) => {
				response.data.sort((a, b) => {
					return new Date(Date.parse(b.pubDate)) - new Date(Date.parse(a.pubDate));
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
		signUserIn: ({commit, dispatch}, payload) => {
			commit('error', null);
			commit('loading', true);
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
				.then(
					user => {
						commit('loading', false);
						const userSignedIn = {
							id: user.uid,
							email: user.email,
							registeredArticles: [],
							fbKeys: {}

						}
						commit('user', userSignedIn);
						dispatch('fetchUserData');
					}
				)
				.catch(
					error => {
						commit('loading', false);
						commit('error', error);
					}
				)
		},
		logout ({commit}) {
			firebase.auth().signOut();
			commit('user', undefined);
			commit('showUserArticles', 0);
		},
		registerUserForArticle ({commit, state, getters}, payload) {
			const user = getters.user;
			const guid = payload.guid;
			if (state.user.registeredArticles.findIndex(article => article.guid === guid) >= 0) {
				return;
			}
			firebase.database().ref('/usersArticles/' + user.id).push(payload)
				.then((data) => {
					commit('registerUserForArticle', {...payload, fbKey: data.key});
				})
				.catch((error) => {
					console.log(error);
				})
		},
		unregisterUserFromArticle ({commit, getters}, payload) {
			const user = getters.user;
			const fbKey = user.fbKeys[payload.guid];
			firebase.database().ref('/usersArticles/' + user.id).child(fbKey).remove()
				.then (() => {
					commit('unregisterUserFromArticle', payload.guid);
				})
				.catch((error) => {
					console.log(error);
				})
		},
		fetchUserData ({commit, getters}) {
			firebase.database().ref('/usersArticles/' + getters.user.id).once('value')
				.then(data => {
					const obj = data.val();
					const registeredArticles = [];
					let swappedPairs = {};
					for (let key in obj) {
						swappedPairs[obj[key].guid] = key;
						if (obj[key].image) {
							registeredArticles.push({
								id: key,
								title: obj[key].title,
								image: obj[key].image, 
								link: obj[key].link,
								pubDate: obj[key].pubDate,
								summary: obj[key].summary,
								guid: obj[key].guid
							})
						} else {
							registeredArticles.push({
								id: key,
								title: obj[key].title,
								link: obj[key].link,
								pubDate: obj[key].pubDate,
								summary: obj[key].summary
							})
						}	
					}
					const updatedUser = {
						id: getters.user.id,
						email: getters.user.email,
						registeredArticles: registeredArticles,
						fbKeys: swappedPairs

					}
					commit('user', updatedUser);
				})
				.catch(error => {
					console.log(error);
				})
		}
	},
	mutations: {
		registerUserForArticle: (state, payload) => {
			const guid = payload.guid;
			if (state.user.registeredArticles.findIndex(article => article.guid === guid) >= 0) {
				return;
			}
			state.user.registeredArticles.push(payload);
			state.user.fbKeys[guid] = payload.fbKey;
		},
		unregisterUserFromArticle: (state, guid) => {
			const registeredArticles = state.user.registeredArticles;
			registeredArticles.splice(registeredArticles.findIndex(article => article.guid === guid), 1);
			Reflect.deleteProperty(state.user.fbKeys, guid);
		},
		setUserArticles: (state, payload) => {
			state.user.registeredArticles = payload;
		},
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
		},
		showUserArticles: (state, payload) => {
			state.showUserArticles = payload;
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
		loadingArticles: state => state.loadingArticles,
		showUserArticles: state => state.showUserArticles
	}
});