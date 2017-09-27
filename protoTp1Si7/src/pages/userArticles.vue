<template>
	<div>
		<v-container grid-list-md text-xs-center fluid class="layoutBox">
			<v-layout row wrap class="layoutBox">
				<articlesBox></articlesBox>
			</v-layout>
		</v-container>
	</div>
	
</template>

<script type="text/javascript">
	
	import { mapGetters } from 'vuex';
	import typesActus from '../components/typesActus';
	import articlesBox from '../components/articlesBox';

	export default {
		components: {
			typesActus,
			articlesBox
		}
	}
</script>

<style type="text/css">
</style>