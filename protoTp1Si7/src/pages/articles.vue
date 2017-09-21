<template>
	<div>
		<!-- <typesActus></typesActus> -->
		<v-container grid-list-md text-xs-center fluid class="">
			<v-layout row wrap class="layoutBox">
				<articlesBox :isUserArticles="0"></articlesBox>
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
	.layoutBox {
	    height: 100%;
	    width: 100%;
	    position: absolute;
	}
	.test {
		height: 2000px;
	}
</style>