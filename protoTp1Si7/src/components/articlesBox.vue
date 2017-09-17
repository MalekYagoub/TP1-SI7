<template>
	<v-flex xs9>
		<v-card height="700px" class="articleBoxScroll" v-if="showUserArticles === 0">
			<p class="headline mt-2" v-if="!articles">Choisissez une catégorie d'actualités et un journal</p>
			<v-layout v-for="article in articles" :key="article.pubDate" mt-2 v-if="articles && !loadingArticles">
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
			<p class="headline mt-2" v-if="user.registeredArticles.length === 0">Vous n'avez pas encore d'articles favoris</p>
			<v-layout v-for="article in user.registeredArticles" :key="article.pubDate" mt-2>
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
		computed: {
			...mapGetters({
				user: 'user',
				articles: 'articles',
				loadingArticles: 'loadingArticles',
				showUserArticles: 'showUserArticles'
			})
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