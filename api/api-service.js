const client = require("./api-client");

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
			console.log("CAUGHT");
			console.log(err);
		}

		return universityData;
	},

	getNamesForUniversity: async function (universityCode) {
		var universityData = [];
		try {
			const names = await client.getNames(universityCode);
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
		} catch (err) {
			console.log("CAUGHT");
			console.log(err);
		}

		return universityData;
	},

	getMarksForUniversity: async function (universityCode) {
		var universityData = [];
		try {
            const marks = await client.getMarks(universityCode);
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
		} catch (err) {
			console.log("CAUGHT");
			console.log(err);
		}

		return universityData;
	},
};
