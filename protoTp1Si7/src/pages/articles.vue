<template>
	<div>
		<v-container grid-list-md text-xs-center fluid class="">
			<v-layout row wrap>
				<articlesBox :isUserArticles="0"></articlesBox>
			</v-layout>
		</v-container>
	</div>
	
</template>

<script type="text/javascript">
	
	import { mapGetters } from 'vuex';
	import articlesBox from '../components/articlesBox';

	export default {
		components: {
			articlesBox
		}
	}
</script>

<style type="text/css">
</style>