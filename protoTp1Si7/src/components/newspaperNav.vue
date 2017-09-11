<template>
	<v-bottom-nav absolute :value="true" :active="activeNewspaper" class="transparent">
		<v-btn v-for="newspaperInfos in newspapersInfos" flat class="teal--text" :value="newspaperInfos.value" 
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
	
</style>