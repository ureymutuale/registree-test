const fsPath = require("fs-path");
const fs = require("fs");

module.exports = {
	saveJSONResponse: function (filepath, responseJSON) {
		try {
			var result = JSON.stringify(responseJSON, null, 4);
			fsPath.writeFile(filepath, result, function (err) {
				fs.writeFileSync(filepath, result, { encoding: "utf8", flag: "w" });
			});
		} catch (err) {
			console.log(err);
		}
	},
	readJSONResponse: function (filepath) {
		var responseJSON = null;
		try {
			var data = fs.readFileSync(filepath, { encoding: "utf-8" });
			var result = JSON.parse(data);
			if (result != null) {
				responseJSON = result;
			}
		} catch (err) {
			console.log(err);
		}
		return responseJSON;
	},
};
