const client = require("./api-client");
const file = require("./file-helper");
const basePath = process.env.DATA_PATH || ".";

module.exports = {
	getDataForUniversity: async function (universityCode) {
		var universityData = [];
		try {
			const names = await this.getNamesForUniversity(universityCode);
			const marks = await this.getMarksForUniversity(universityCode);

			universityData = names.map((item, i) =>
				Object.assign({}, item, marks[i])
			);
		} catch (err) {
			console.log(err);
		}

		return universityData;
	},

	getNamesForUniversity: async function (universityCode) {
		var filename = `${basePath}/.cache/${universityCode}/names.json`;
		var universityData = file.readJSONResponse(filename);
		if (universityData == null) {
			universityData = [];
		}
		try {
			client
				.getNames(universityCode)
				.then((resp) => {
					universityData = [];
					const names = resp;
					if (names === null) {
						throw Error("Invalid Response");
					}
					Object.keys(names).forEach((key) => {
						universityData.push({
							student_id: key,
							name: names[key],
							university: universityCode,
						});
					});

					file.saveJSONResponse(filename, universityData);
				})
				.catch((err) => {
					console.log(err);
					throw err;
				});
		} catch (err) {
			console.log(err);
		}

		return universityData;
	},

	getMarksForUniversity: async function (universityCode) {
		var filename = `${basePath}/.cache/${universityCode}/marks.json`;
		var universityData = file.readJSONResponse(filename);
		if (universityData == null) {
			universityData = [];
		}

		try {
			client
				.getMarks(universityCode)
				.then((resp) => {
					universityData = [];
					const marks = resp;
					if (marks === null) {
						throw Error("Invalid Response");
					}
					Object.keys(marks).forEach((key) => {
						universityData.push({
							student_id: key,
							mark: marks[key],
							university: universityCode,
						});
					});

					file.saveJSONResponse(filename, universityData);
				})
				.catch((err) => {
					console.log(err);
					throw err;
				});
		} catch (err) {
			console.log(err);
		}

		return universityData;
	},
};
