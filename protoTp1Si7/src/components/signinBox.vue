<template>
	<v-container grid-list-md text-xs-center fluid>
		<v-layout>
			<v-flex xs12 sm6 offset-sm3>
				<app-alert  v-if="error" v-on:dismissed="onDismissed" :code="error.code"></app-alert>
				<v-card class="mt-2">
					<v-card-text>
						<p class="text-xs-center headline">Connexion</p>
						<v-container>
							<form @submit.prevent="signIn">
								<v-layout row>
									<v-flex xs12>
										<v-text-field	
							              name="input-1"
							              label="Email"
							              id="email"
							              prepend-icon="mail"
							              v-model="email"
							              required
							            ></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs12>
										<v-text-field
							              name="input-1"
							              label="Mot de passe"
							              id="password"
							              prepend-icon="lock"
							              v-model="password"
							              required
							              type="password"
							            ></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs12>
										<v-btn class="primary black--text" type="submit" :disabled="loading" :loading="loading">
											Connexion
										</v-btn>
										<v-btn class="primary black--text" @click="clear">Effacer</v-btn>
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
				password: ''
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
			signIn () {
				this.$store.dispatch('signUserIn', {email: this.email, password: this.password, $router: this.$router});
			},
		},
		computed : {
			...mapGetters({
				userSignedUp: 'userSignedUp',
				user: 'user',
				error: 'error',
				loading: 'loading'
			})
		}
	}
</script>