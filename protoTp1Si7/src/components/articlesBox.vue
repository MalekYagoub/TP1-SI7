<template>
	<v-flex xs9>
		<v-card height="700px" class="articleBoxScroll">
			<v-layout v-for="article in articles" mt-2 v-if="articles">
			    <v-flex xs12 ml-2 mr-2>
			      <v-card>
					<v-card-title class="text-xs-center">
						<div class="centerTitle">
							<p class="display-1">{{article.title}}</p>
							<p class="blue--text">{{getDate(article.published)}}</p>
						</div>
					</v-card-title>
					<v-card-text class="text-xs-center" v-html="article.content">
					</v-card-text>
					<v-card-actions>
						<v-btn flat class="indigo--text" @click.native="goToNews(article.link)">
							Lire
						</v-btn>
					</v-card-actions>
			      </v-card>
			    </v-flex>
			</v-layout>
		</v-card>
	</v-flex>
</template>

<script type="text/javascript">

	import { mapGetters } from 'vuex';

	export default {
		mounted () {
			this.$store.dispatch('getArticles');
		},
		computed: {
			...mapGetters({
				articles: 'articles'
			})
		},
		methods: {
			goToNews (url) {
				window.open(url);
			},
			getDate (date) {
				var timestamp = Date.parse(date);
				var a = new Date(timestamp);
				var months = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'];
				var year = a.getFullYear();
				var month = months[a.getMonth()];
				var date = a.getDate();
				var hours = a.getHours();
				var minutes = a.getMinutes();
				var time = date + ' ' + month + ' ' + year + ' à ' + hours + ':' + minutes ;
				return time;
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