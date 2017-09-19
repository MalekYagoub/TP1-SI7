<template>
	<v-flex xs12 mr-1 ml-1>
		<v-card>
			<v-card-media v-if="content.image" :src="jpgImage" height="200px">
			</v-card-media>
			<v-card-title class="text-xs-center">
				<div class="centerTitle">
					<p class="display-1">{{content.title}}</p>
					<p class="secondary--text" v-if="!content.userArticle">{{getDate(content.pubDate)}}</p>
					<p class="secondary--text" v-else>{{content.pubDate}}</p>
				</div>
			</v-card-title>
			<v-card-text class="text-xs-center" v-html="content.summary"></v-card-text>
			<v-card-actions>
				<v-btn flat class="secondary--text" @click.native="goToNews(content.link)">
					Lire
				</v-btn>
				<v-btn flat class="green--text" v-if="user && !userIsRegistered" @click.native="registerForArticle(content)">
					Favoris
				</v-btn>
				<v-btn v-if="content.userArticle === true" flat class="red--text" @click.native="unRegisterFromArticle({guid: content.guid})">
					Retirer des favoris
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-flex>
</template>

<script type="text/javascript">
	export default {
		props: ['content'],
		computed: {
			user () {
				return this.$store.state.user;
			},
			jpgImage () {
				console.log(this.content.image);
				if (/jpg/.test(this.content.image)) return this.content.image.substring(0, this.content.image.indexOf("jpg") + 3);
				else if (/JPG/.test(this.content.image)) return this.content.image.substring(0, this.content.image.indexOf("JPG") + 3);
				else if (/png/.test(this.content.image)) return this.content.image.substring(0, this.content.image.indexOf("png") + 3);
				else return this.content.image.substring(0, this.content.image.indexOf("PNG") + 3);
				
			},
			userIsRegistered () {
				if (this.user.registeredArticles) {
					return this.user.registeredArticles.findIndex(registeredArticles => {
						return registeredArticles.guid === this.content.guid
					}) >= 0;
				}
			}
		},
		methods : {
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
			}, 
			registerForArticle (article) {
				if (this.content.image) {
					this.$store.dispatch('registerUserForArticle', {pubDate: this.getDate(article.pubDate), title: article.title, image: this.content.image, summary: article.summary, link: article.link, guid: article.guid}
					);
				} else {
					this.$store.dispatch('registerUserForArticle', {pubDate: this.getDate(article.pubDate), title: article.title, summary: article.summary, link: article.link, guid: article.guid}
					);
				}		
			},
			unRegisterFromArticle (guid) {
				console.log(this.content.guid);
				this.$store.dispatch('unregisterUserFromArticle', guid);
			}
		}
		
	}
</script>