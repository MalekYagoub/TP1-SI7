<template>
	<v-container grid-list-md text-xs-center fluid>
		<v-layout row wrap class="layoutBox">
			<userBox class="fixedUserBox"></userBox>
			<articlesBox></articlesBox>
			<v-btn @click.native="goTop"
			  fixed
              dark
              fab
              bottom
              right
              class="secondary"
            >
              <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
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
		},
		methods: {
			goTop () {
				scroll(0,0);
			}
		}
	}
</script>

<style type="text/css">
	.fixedUserBox {
		position: fixed;
		left: 4%;
	}

	@media all and (max-width: 1275px) {
		.fixedUserBox {
			position: static;
			width: 50%;
		}
	}
</style>