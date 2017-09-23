<template>
	<v-flex xs12 sm8 offset-sm2 offset-lg0  mb-1>
		<app-alert  v-if="error" v-on:dismissed="onDismissed" :code="error.code"></app-alert>
		<app-info  v-if="userSignedUp" v-on:dismissed="onDismissed" :info="'Compte crée avec succès !'"></app-info>
		<v-card v-if="signUpOrSignIn === 0 && user === undefined && user == null">
			<v-card-text class="px-0 headline"> <!-- SIGN IN -->
				Connexion
				<form @submit.prevent="signIn">
					<v-container fluid>
						<v-layout>
							<v-text-field	
				              name="input-1"
				              label="Email"
				              id="email"
				              prepend-icon="mail"
				              v-model="email"
				              required
				            ></v-text-field>
						</v-layout>
					</v-container>
					<v-container fluid>
						<v-layout>
							<v-text-field
				              name="input-1"
				              label="Mot de passe"
				              id="password"
				              prepend-icon="lock"
				              v-model="password"
				              required
				              type="password"
				            ></v-text-field>
						</v-layout>
					</v-container>
					<v-container>
						<v-layout wrap>
							<v-flex>
								<v-btn class="primary black--text" type="submit" :disabled="loading" :loading="loading">
									Connexion
								</v-btn>
							</v-flex>
							<v-flex><v-btn class="primary black--text" @click="clear">Effacer</v-btn></v-flex>
						</v-layout>
					</v-container>
				</form>

				<p class="mt-3 title">Pas encore de compte, <br> 
					<span class="secondary--text link" @click="showSignUpForm">
						inscrivez vous !
					</span>
				</p>
			</v-card-text>

		</v-card>

		<v-card v-if="signUpOrSignIn === 1 && user === undefined && user == null">
			<v-card-text class="px-0 headline"> <!-- SIGN UP -->
				Inscription
				<form @submit.prevent="signUp">
					<v-container fluid>
						<v-layout>
							<v-text-field	
				              name="email"
				              label="Email"
				              id="email"
				              prepend-icon="mail"
				              type="email"
				              v-model="email"
				              required
				            ></v-text-field>
						</v-layout>
					</v-container>
					<v-container fluid>
						<v-layout>
							<v-text-field
				              name="password"
				              label="Mot de passe"
				              id="password"
				              prepend-icon="lock"
				              required
				              type="password"
				              v-model="password"
				            ></v-text-field>
						</v-layout>
					</v-container>
					<v-container fluid>
						<v-layout>
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
						</v-layout>
					</v-container>
					<v-container>
						<v-layout wrap>
							<v-flex>
								<v-btn class="primary black--text" type="submit" :disabled="loading" :loading="loading">
									S'inscrire
								</v-btn>
							</v-flex>
							<v-flex><v-btn class="primary black--text" @click="clear">Effacer</v-btn></v-flex>
						</v-layout>
					</v-container>
				</form>

				<v-card-actions class="white">
	                <v-btn icon @click="showSignInForm">
	                  <v-icon class="secondary--text">keyboard_arrow_left</v-icon>
	                </v-btn>
               	</v-card-actions>
			</v-card-text>
		</v-card>

		<v-card v-if="user" class="pb-2">
			<v-card-text class="px-0 title">
				<v-container>
					<span>Connecté avec</span>
				</v-container>
				<v-container>
					{{ user.email }}
				</v-container>
			</v-card-text>
			<v-container>
				<v-layout wrap>
					<v-flex>
							<v-btn class="primary black--text" v-if="showUserArticles === 0" @click.native="showUserArticlesCommit">Mes articles</v-btn>
							<v-btn class="primary black--text" v-else-if="showUserArticles === 1" @click.native="showAllArticles">Retour</v-btn>
					</v-flex>
					<v-flex><v-btn class="primary black--text" type="submit" @click="logout">Déconnexion</v-btn></v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-flex>
</template>

<script type="text/javascript">

	import { mapGetters } from 'vuex';

	export default {
		data () {
			return {
				signUpOrSignIn: 0,
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
			signIn () {
				this.$store.dispatch('signUserIn', {email: this.email, password: this.password});
			},
			signUp () {
				if (this.password === this.confirmPassword) this.$store.dispatch('signUserUp', {email: this.email, password: this.password});
			},
			showSignUpForm () {
				this.signUpOrSignIn = 1;
				this.email = "";
				this.password = "";
			},
			showSignInForm () {
				this.signUpOrSignIn = 0;
				this.email = "";
				this.password = "";
				this.confirmPassword = "";
			},
			logout () {
				this.email = "";
				this.password = "";
				this.$store.dispatch('logout');
			},
			showUserArticlesCommit () {
				this.$store.commit('showUserArticles', 1);
				scroll(0,0);
			},
			showAllArticles () {
				this.$store.commit('showUserArticles', 0);
				scroll(0,0);
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
				loading: 'loading',
				showUserArticles: 'showUserArticles'
			})
		},
		watch: {
			userSignedUp (value) {
				if (this.userSignedUp === true) {
					this.signUpOrSignIn = 0;
					this.email = "";
					this.password = "";
					setTimeout(() => {
						this.$store.commit('userSignedUp', false);
					}, 3000);
				}
			}
		}
	}
</script>

<style type="text/css">
	.link {
		cursor: pointer;
	}
</style>