const auth = require("basic-auth");

const users = {
	admin: "supersecret",
	recruiter: "supersecret",
};

module.exports = function (request, response, next) {
	var cred = auth(request);
	var password = cred && cred.name ? users[`${cred.name}`] : null;
	console.log(cred);
	console.log(password);
	if ((!password || password !== cred.pass) && request.method !== "OPTIONS") {
		response.set("WWW-Authenticate", 'Basic realm="example"');
		return response.status(401).send();
	}
	return next();
};
