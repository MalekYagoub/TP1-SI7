import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		activeTypeActus: '',
		activeNewspaper: '',
		articles: undefined
	},
	actions: {
		getArticles: ({state, commit}, payload) => {
			console.log(payload);
			axios.get('http://localhost:3000/getArticles/' + payload).then((response) => {
				response.data.sort((a, b) => {
					return new Date(Date.parse(b.published)) - new Date(Date.parse(a.published));
				});
				commit('articles', response.data);
			});
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
		}
	},
	getters: {
		activeTypeActus: state => state.activeTypeActus,
		activeNewspaper: state => state.activeNewspaper,
		articles: state => state.articles
	}
});