const AuthMixin = {
	computed: {
		authenticatedUserName() {
			return localStorage.getItem("registree_auth_username");
		},
		authenticatedUserPassword() {
			return localStorage.getItem("registree_auth_password");
		},
		isAuthenticated() {
			return localStorage.getItem("registree_authenticated") === "1";
		},
	},
	methods: {
		authenticatedWith(username, password) {
			localStorage.setItem("registree_auth_username", username);
			localStorage.setItem("registree_auth_password", password);
			localStorage.setItem("registree_authenticated", 1);
		},
		logout() {
			localStorage.removeItem("registree_auth_username");
			localStorage.removeItem("registree_auth_password");
			localStorage.removeItem("registree_authenticated");
			this.$router.go();
		},
	},
};

export default AuthMixin;
