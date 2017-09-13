<template>
	<v-alert success dismissible @input="onClose" :value="true">
		{{ info }}
	</v-alert>
</template>

<script type="text/javascript">
	export default {
		props: ['info'],
		methods: {
			onClose () {
				this.$emit('dismissed');
			}
		}
	}
</script>