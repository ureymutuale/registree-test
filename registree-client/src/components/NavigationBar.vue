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
					<b-nav-item-dropdown right>
						<!-- Using 'button-content' slot -->
						<template v-slot:button-content>
							<em>Username</em>
						</template>
						<b-dropdown-item>Sign Out</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>

export default {
	name: "NavigationBar",
	components: {},
	props: {},
	data() {
		return {
		};
	},
	computed: {
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {
	},
};
</script>

<style></style>
