const axios = require("axios");

const baseUrl =
	process.env.API_URL || "https://registree-coding-challenge.glitch.me";

module.exports = {
	getMarks: async function (universityCode) {
		const url = `${baseUrl}/${universityCode}/marks`;
		var config = {
			async: true,
			crossDomain: true,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			auth: {},
			json: true,
		};
		return new Promise(async (resolve, reject) => {
			var data = null;
			try {
				const response = await axios.get(url, config);
				console.log("----- statusCode:", response.status);
				console.log("----- Data:", response.data);
				if (
					response.status === 200 &&
					response.data &&
					!this.isEmptyObject(response.data)
				) {
					data = response.data;
				}
				resolve(data);
			} catch (err) {
				console.log(err);
				reject(err);
			}
		});
	},

	getNames: async function (universityCode) {
		const url = `${baseUrl}/${universityCode}/names`;
		var config = {
			async: true,
			crossDomain: true,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			auth: {},
			json: true,
		};
		return new Promise(async (resolve, reject) => {
			var data = null;
			try {
				const response = await axios.get(url, config);
				console.log("----- statusCode:", response.status);
				console.log("----- Data:", response.data);
				if (
					response.status === 200 &&
					response.data &&
					!this.isEmptyObject(response.data)
				) {
					data = response.data;
				}
				resolve(data);
			} catch (err) {
				console.log(err);
				reject(err);
			}
		});
	},

	isEmptyObject: function (obj) {
		if (typeof obj !== "object" && obj !== null) {
			console.log(obj);
			return true;
		}
		for (var key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				return false;
			}
		}
		return true;
	},
};
