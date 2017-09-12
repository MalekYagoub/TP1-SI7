<template>
	<v-alert error dismissible @input="onClose" :value="true">
		{{ errorMessage }}
	</v-alert>
</template>

<script type="text/javascript">
	export default {
		props: ['code'],
		data () {
			return {
				message: ""
			}
		},
		methods: {
			onClose () {
				this.$emit('dismissed');
			}
		},
		computed : {
			errorMessage () {
				return this.code === "auth/wrong-password" ? this.message = "Le mot de passe est invalide ou l'utilisateur n'a pas de mot de pase" : this.code === "auth/invalid-email" ? this.message = "L'adresse email est mal formaté": this.code === "auth/weak-password" ? this.message = "Le mot de passe doit contenir au moins 6 caractères" : this.code === "auth/email-already-in-use" ? this.message = "L'adresse email est déja utilisé" : this.code === "auth/user-not-found" ? this.message = "L'utilisateur n'existe pas" : this.message = "Erreur d'authentification"
			}
		}
	}
</script>