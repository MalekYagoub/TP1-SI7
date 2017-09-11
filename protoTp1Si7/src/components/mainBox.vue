<template>
	<v-container grid-list-md text-xs-center>
		<v-layout row wrap>
			<userBox></userBox>
			<articlesBox></articlesBox>
		</v-layout>
	</v-container>
</template>

<script type="text/javascript">

	import userBox from './userBox';
	import articlesBox from './articlesBox';

	export default {
		data () {
			return {
			}
		},
		components: {
			'userBox': userBox,
			'articlesBox': articlesBox
		}
	}
</script>

<style type="text/css">
</style>