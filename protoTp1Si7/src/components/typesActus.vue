<template>
	<div>
		<v-card height="56px">
		    <v-bottom-nav
		      absolute
		      shift
		      :value="true"
		      :active.sync="selected"
		      :class="{
		      	'yellow darken-4': selected === 0,
		        'light-green accent-4': selected === 1,
		        'deep-orange darken-4': selected === 2,
		        'deep-purple accent-2': selected === 3,
		        'brown lighten-1': selected === 4,
		        'grey darken-4': selected === 5,
		      }"
		      class="secondary"
		    >
		        <v-btn dark @click.native="setactiveTypeActus('economie')">
		        	<span>Economie</span>
		        	<v-icon>euro_symbol</v-icon>
		      	</v-btn>
		     	<v-btn dark @click.native="setactiveTypeActus('actuFrance')">
		        	<span>Actu France</span>
		        	<v-icon>pin_drop</v-icon>
		      	</v-btn>
		      	<v-btn dark @click.native="setactiveTypeActus('actuMondiale')">
		        	<span>Actu mondiale</span>
		        	<v-icon>airplanemode_active</v-icon>
		      	</v-btn>
		      	<v-btn dark @click.native="setactiveTypeActus('sport')">
		        	<span>Sport</span>
		        	<v-icon>directions_bike</v-icon>
		      	</v-btn>
		      	<v-btn dark @click.native="setactiveTypeActus('technologie')">
		        	<span>Technologie</span>
		        	<v-icon>laptop_mac</v-icon>
		      	</v-btn>
		    	<v-btn dark @click.native="setactiveTypeActus('politique')">
		        	<span>Politique</span>
		        	<v-icon>group</v-icon>
		    	</v-btn>
		    </v-bottom-nav>
		</v-card>
		<v-card height="56px" class="mb-4">
			<newspaperNav v-show="activeTypeActus === 'economie'" 
			:newspapersInfos="[{value: 'leMonde', name: 'Le Monde'}, {value: 'leFigaro', name: 'Le Figaro'}, {value: 'laCroix', name: 'La Croix'}, {value: 'leParisien', name: 'Le Parisien'}, {value: 'leTelegramme', name: 'Le Télégramme'}]"/>
			</newspaperNav>
			<newspaperNav v-show="activeTypeActus === 'actuFrance'"
			:newspapersInfos="[{value: 'lexpress', name: 'L\'express'}, {value: 'leMonde', name: 'Le Monde'}, {value: 'liberation', name: 'Libération'}, {value: 'leFigaro', name :'Le Figaro'}, {value: 'laCroix', name: 'La Croix'}, {value: 'leParisien', name: 'Le Parisien'}, {value: 'leTelegramme', name: 'Le Télégramme'}]">
			</newspaperNav>
			<newspaperNav v-show="activeTypeActus === 'actuMondiale'"
			:newspapersInfos="[{value: 'lexpress', name: 'L\'express'}, {value: 'liberation', name: 'Libération'}, {value: 'leFigaro', name: 'Le Figaro'}, {value: 'laCroix', name: 'La Croix'}, {value: 'leParisien', name: 'Le Parisien'}, {value: 'leTelegramme', name: 'Le Télégramme'}]">
			</newspaperNav>
			<newspaperNav v-show="activeTypeActus === 'sport'"
			:newspapersInfos="[{value: 'lexpress', name: 'L\'express'}, {value: 'liberation', name: 'Libération'}, {value: 'sport24', name: 'Sport24'}, {value: 'laCroix', name: 'La Croix'}, {value: 'leParisien', name: 'Le Parisien'}, {value: 'leTelegramme', name: 'Le Télégramme'}]">
			</newspaperNav>
			<newspaperNav v-show="activeTypeActus === 'technologie'"
			:newspapersInfos="[{value: 'leMonde', name: 'Le Monde'}, {value: 'leFigaro', name: 'Le Figaro'}, {value: 'leParisien', name: 'Le Parisien'}]">
			</newspaperNav>
			<newspaperNav v-show="activeTypeActus === 'politique'"
			:newspapersInfos="[{value: 'lexpress', name: 'L\'express'}, {value: 'liberation', name: 'Libération'}, {value: 'leFigaro', name: 'Le Figaro'}, {value: 'laCroix', name: 'La Croix'}, {value: 'leParisien', name: 'Le Parisien'}]">
			</newspaperNav>
		</v-card>
	</div>
	
</template>

<script type="text/javascript">

	import newspaperNav from './newspaperNav';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			'newspaperNav': newspaperNav
		},
		methods: {
			setactiveTypeActus (typeActus) {
				this.$store.commit('activeTypeActus', typeActus);
				this.$store.commit('showUserArticles', 0);
				if (this.activeNewspaper) this.$store.commit('activeNewspaper', undefined);
				if (this.articles) this.$store.commit('articles', undefined);
			}
		},
		computed: {
			...mapGetters({
				activeTypeActus: 'activeTypeActus',
				activeNewspaper: 'activeNewspaper',
				articles: 'articles'
			})
		},
		data () {
			return {
				selected: undefined
			}
		},
		watch: {
			activeNewspaper() {
				 if (this.activeNewspaper) this.$store.dispatch('getArticles', this.activeTypeActus + this.activeNewspaper);
			}
		}
	}
</script>

<style type="text/css">
	
</style>