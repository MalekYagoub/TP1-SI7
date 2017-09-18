<template>
	<v-flex xs12 sm10>
		<v-card height="700px" class="articleBoxScroll" v-if="showUserArticles === 0">
			<v-flex offset-xs3 xs6 v-if="articles">
				<v-text-field
					name="input-1-3"
					label="Rechercher un titre"
					single-line
					prepend-icon="search"
					xs6
					v-model="query"
				></v-text-field>
			</v-flex>
			<p class="headline mt-2" v-if="!articles">Choisissez une catégorie d'actualités et un journal</p>
			<v-layout v-for="article in computedList" :key="article.pubDate" mt-2 v-if="articles && !loadingArticles">
				<articleCmp v-if="article.enclosures[0]" :content="{pubDate: article.pubDate, title: article.title, summary: article.summary, image: article.enclosures[0].url, link: article.link, guid: article.guid}"></articleCmp>

				<articleCmp v-else :content="{pubDate: article.pubDate, title: article.title, summary: article.summary, link: article.link, guid: article.guid}"></articleCmp>
			</v-layout>
			<v-layout mt-2 v-if="loadingArticles">
				<v-flex xs12 ml-2 mr-2>
					 <v-progress-circular indeterminate v-bind:size="50" class="primary--text secondary--text"></v-progress-circular>
				</v-flex>
			</v-layout>
		</v-card>
		<v-card height="700px" class="articleBoxScroll" v-else>
			<v-flex offset-xs3 xs6 v-if="user && user.registeredArticles.length > 0">
				<v-text-field
					name="input-1-3"
					label="Rechercher un titre"
					single-line
					prepend-icon="search"
					xs6
					v-model="query"
				></v-text-field>
			</v-flex>
			<p class="headline mt-2" v-if="user.registeredArticles.length === 0">Vous n'avez pas encore d'articles favoris</p>
			<v-layout v-for="article in computedListUser" :key="article.pubDate" mt-2>
				<articleCmp v-if="article.image" :content="{pubDate: article.pubDate, title: article.title, summary: article.summary, image: article.image, link: article.link, guid: article.guid, userArticle: true}"></articleCmp>

				<articleCmp v-else :content="{pubDate: article.pubDate, title: article.title, summary: article.summary, link: article.link, guid: article.guid, userArticle: true}"></articleCmp>
			</v-layout>
		</v-card>
	</v-flex>
</template>

<script type="text/javascript">

	import { mapGetters } from 'vuex';
	import articleCmp from './article';

	export default {
		components: {
			articleCmp
		},
		data () {
			return {
				query: ''
			}
		},
		computed: {
			...mapGetters({
				user: 'user',
				articles: 'articles',
				loadingArticles: 'loadingArticles',
				showUserArticles: 'showUserArticles'
			}),
			computedList: function () {
				if (this.articles) {
					var vm = this;
				return this.articles.filter(function (article) {
					return article.title.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1;
				});
				}
			},
			computedListUser: function () {
				if (this.user.registeredArticles) {
					var vm = this;
					return this.user.registeredArticles.filter(function (article) {
						return article.title.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1;
					});
				}
			}
		},
		watch: {
			articles () {
				this.query = '';
			},
			showUserArticles () {
				this.query = '';
			}
		}
	}
</script>

<style type="text/css">
	.articleBoxScroll {
		overflow-y: scroll;
	}
	.centerTitle {
		margin: auto;
	}
</style>