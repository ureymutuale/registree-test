<template>
	<div>
		<NavigationBar />
		<b-container fluid class="pt-3" v-if="isAuthenticated">
			<b-row>
				<b-col>
					<b-card>
						<template v-slot:header>
							<h6 class="mb-0">Students</h6>
						</template>
						<template v-slot:footer>
							<em>Footer Slot</em>
						</template>
						<div>
							<b-row class="justify-content-between">
								<b-col cols="auto">
									<b-form-group>
										<b-input-group>
											<b-input-group-prepend is-text>
												<b-icon icon="search" />
											</b-input-group-prepend>

											<b-form-input placeholder="search"></b-form-input>
										</b-input-group>
									</b-form-group>
								</b-col>
								<b-col cols="auto"> </b-col>
							</b-row>
							<b-table
								responsive
								hover
								bordered
								show-empty
								head-variant="dark"
								stacked="sm"
								:fields="fields"
								:items="data"
								:filter="searchKeyword"
								ref="table"
							>
							</b-table>
						</div>
						<b-overlay :show="isLoading" :opacity="0.5" no-wrap></b-overlay>
					</b-card>
				</b-col>
			</b-row>
		</b-container>
		<b-container class="pt-4" v-if="!isAuthenticated">
			<b-jumbotron
				header="Unauthorized Access"
				lead="Please Login using your credentials"
			>
				<p>For more information contact the <a href="mailto:admin@email.com">admin@email.com</a> </p>
			</b-jumbotron>
		</b-container>
	</div>
</template>

<script>
import axios from "axios";
import AuthMixin from '@/mixins/auth'
import NavigationBar from "@/components/NavigationBar.vue";

export default {
	name: "Students",
	components: {
		NavigationBar,
	},
	mixins: [AuthMixin],
	props: {},
	data() {
		return {
			loading: false,
			searchKeyword: "",
			fields: [
				{
					key: "university",
					label: "University",
					sortKey: "university",
					sortable: true,
				},
				{
					key: "student_id",
					label: "Student #",
					sortKey: "student_id",
					sortable: true,
				},
				{
					key: "name",
					label: "Name",
					sortKey: "name",
					sortable: true,
				},
				{
					key: "mark",
					label: "Marks",
					sortKey: "mark",
					sortable: true,
				},
			],
			data: [],
		};
	},
	computed: {
		isLoading() {
			return this.loading;
		},
	},
	watch: {},
	created() {},
	mounted() {
		this.fetchData();
	},
	methods: {
		async fetchData() {
			this.loading = true;
			axios
				.get("http://localhost:3000/raw", {
					timeout: 10000,
					auth: {
						username: this.authenticatedUserName,
						password: this.authenticatedUserPassword,
					},
					headers: {
						"Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
					},
					crossDomain: true,
				})
				.then((response) => {
					const responseData = response.data;
					if (responseData != null && responseData.data != null) {
						const data = responseData.data;
						this.data = data;
					}
					this.loading = false;
					this.$refs.table.refresh();
				});
		},
	},
};
</script>

<style></style>
