<template>
	<v-container grid-list-md text-xs-center fluid>
		<v-layout row wrap class="layoutBox">
			<userBox></userBox>
			<articlesBox ></articlesBox>
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
	.layoutBox {
		height: 100%;
		width: 100%;
		padding-right: 8px;
		position: absolute;
	}
</style>