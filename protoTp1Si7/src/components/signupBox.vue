<template>
	<v-container grid-list-md text-xs-center fluid>
		<v-layout>
			<v-flex xs12 sm6 offset-sm3>
				<app-alert  v-if="error" v-on:dismissed="onDismissed" :code="error.code"></app-alert>
				<v-card class="mt-2">
					<v-card-text>
						<p class="text-xs-center headline">Inscription</p>
						<v-container>
							<form @submit.prevent="signUp">
								<v-layout row>
									<v-flex xs12>
										<v-text-field	
							              name="email"
							              label="Email"
							              id="email"
							              prepend-icon="mail"
							              type="email"
							              v-model="email"
							              required
							            ></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs12>
										<v-text-field
							              name="password"
							              label="Mot de passe"
							              id="password"
							              prepend-icon="lock"
							              required
							              type="password"
							              v-model="password"
							            ></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout>
									<v-flex xs12>
										<v-text-field
							              name="confirmPassword"
							              label="Ressaisir mot de passe"
							              id="confirmPassword"
							              prepend-icon="lock"
							              required
							              type="password"
							              v-model="confirmPassword"
							              :rules="[comparePasswords]"
							            ></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs12>
										<v-btn class="primary" type="submit" :disabled="loading" :loading="loading">
											S'inscrire
										</v-btn>
										<v-btn class="primary" @click="clear">Effacer</v-btn>
									</v-flex>
								</v-layout>
							</form>
						</v-container>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script type="text/javascript">
	
	import { mapGetters } from 'vuex';

	export default {
		data () {
			return {
				email: '',
				password: '',
				confirmPassword: ''
			}
		},
		methods: {
			onDismissed () {
				this.$store.commit('error', null);
				this.$store.commit('userSignedUp', false);
			},
			clear () {
				this.email = '';
				this.password = '';
				this.confirmPassword = ''
			},
			signUp () {
				if (this.password === this.confirmPassword) this.$store.dispatch('signUserUp', {email: this.email, password: this.password, $router: this.$router});
			}
		},
		computed : {
			comparePasswords () {
				return this.password !== this.confirmPassword ? "Mots de passes différents" : ''
			},
			...mapGetters({
				userSignedUp: 'userSignedUp',
				user: 'user',
				error: 'error',
				loading: 'loading'
			})
		}
	}
</script>

<style type="text/css">
	
</style>