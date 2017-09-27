<template>
		<v-bottom-nav absolute :value="true" :active="activeNewspaper" class="transparent horizontalBar">
			<v-btn v-for="newspaperInfos in newspapersInfos" :key="newspaperInfos.name" flat class="secondary--text button-newspaper" :value="newspaperInfos.value" 
			@click.native="setActiveNewspaper(newspaperInfos.value)">
				<span>{{newspaperInfos.name}}</span>
			</v-btn>
		</v-bottom-nav>
</template>

<script type="text/javascript">
	import { mapGetters } from 'vuex';

	export default {
		props: ['newspapersInfos'],
		methods: {
			setActiveNewspaper(newspaper) {
				this.$store.commit('activeNewspaper', newspaper);
				this.$store.commit('showUserArticles', 0);
				scroll(0,0);
			}
		},
		computed: {
			...mapGetters({
				activeNewspaper: 'activeNewspaper'
			})
		},
	}
</script>

<style type="text/css">
	.horizontalBar {
		overflow: auto;
		overflow-y: hidden;
		white-space: nowrap;
		-webkit-overflow-scrolling: touch;
		-ms-overflow-style: -ms-autohiding-scrollbar;
	}
</style>