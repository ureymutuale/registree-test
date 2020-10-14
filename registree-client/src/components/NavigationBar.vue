<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="dark" :sticky="true">
			<b-navbar-brand href="#">
				<img alt="Vue logo" src="../assets/logo.png" height="30px" />
				Registree
			</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav> </b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">

                    <b-nav-form class="mr-3" v-if="!isAuthenticated" @submit="login">
						<label class="sr-only" for="inline-form-input-name">Name</label>
						<b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
							<b-input
								id="username"
								placeholder="Username"
								type="text"
								v-model="form.username"
							></b-input>
						</b-input-group>

						<label class="sr-only" for="inline-form-input-username"
							>Username</label
						>
						<b-input-group prepend="🔒" class="mb-2 mr-sm-2 mb-sm-0">
							<b-input
								id="password"
								placeholder="Password"
								type="password"
								v-model="form.password"
							></b-input>
						</b-input-group>
						<b-button variant="success" type="submit">Login</b-button>
					</b-nav-form>

					<b-nav-item-dropdown right v-if="isAuthenticated">
						<!-- Using 'button-content' slot -->
						<template v-slot:button-content>
                            <b-avatar class="mr-2" size="md"></b-avatar>
							<em>{{ authenticatedUserName }}</em>
						</template>
						<b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
import AuthMixin from '@/mixins/auth'

export default {
	name: "NavigationBar",
    components: {},
    mixins: [AuthMixin],
	props: {},
	data() {
		return {
            form: {
				username: "",
				password: "",
			},
		};
	},
	computed: {
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {
        login() {
            this.authenticatedWith(this.form.username, this.form.password)
        },
	},
};
</script>

<style></style>
