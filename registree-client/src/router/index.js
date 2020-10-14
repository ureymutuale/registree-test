import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Students",
		component: () => import("@/pages/Students.vue"),
	},
];

Vue.router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default Vue.router;
