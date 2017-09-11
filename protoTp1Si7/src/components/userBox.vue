<template>
	<v-flex xs3>
		<v-card height="500px">
			<v-card-text class="px-0 headline">
				Pas encore de compte, inscrivez vous !
				<v-container fluid>
					<v-layout>
						<v-text-field	
			              name="input-1"
			              label="Email"
			              id="testing"
			              prepend-icon="mail"
			            ></v-text-field>
					</v-layout>
				</v-container>
				<v-container fluid>
					<v-layout>
						<v-text-field
			              name="input-1"
			              label="Mot de passe"
			              id="testing"
			              prepend-icon="lock"
			            ></v-text-field>
					</v-layout>
				</v-container>
				<v-container fluid>
					<v-layout>
						<v-text-field
			              name="input-1"
			              label="Ressaisir Mot de passe"
			              id="testing"
			              prepend-icon="lock"
			            ></v-text-field>
					</v-layout>
				</v-container>
				<v-layout>
					<v-flex xs6><v-btn class="red accent-2" large @click="submit">S'inscrire</v-btn></v-flex>
					<v-flex xs6><v-btn class="red accent-2" large @click="clear">Effacer</v-btn></v-flex>
				</v-layout row wrap>
			</v-card-text>
		</v-card>
	</v-flex>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {

			}
		},
		methods: {
			submit () {

			},
			clear () {

			}
		}
	}
</script>

<style type="text/css">
	
</style>