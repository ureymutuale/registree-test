const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const auth = require("./auth");
const service = require("./api-service");

const router = express.Router();
const app = express();

const port = process.env.PORT || 3000;

router.get("/raw", async (req, res) => {
	const requestQuery = req.query;
	const requestBody = req.body;
	// console.log(`\nQuery ${JSON.stringify(requestQuery)}\nBody: ${JSON.stringify(requestBody)}`);
	var response = {
		message: `Response Message`,
		query: requestQuery,
		body: requestBody,
	};

	if (requestQuery.university) {
		const data = await service.getDataForUniversity(requestQuery.university);
		response.data = data;
	} else {
		const ujData = await service.getDataForUniversity("UJ");
		const suData = await service.getDataForUniversity("SU");
		response.data = [...ujData, ...suData];
	}

	res.json(response);
});

//Configure CORS
var whitelist = ["localhost", "localhost:8080", "localhost:3001"];
var corsOptions = {
	maxAge: 0,
	preflightContinue: true,
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Credentials": "true",
	// origin: function(origin, callback) {
	//     if (whitelist.indexOf(origin) !== -1 || !origin) {
	//         callback(null, true)
	//     } else {
	//         callback(new Error('Not allowed by CORS'))
	//     }
	//     return callback(null, true);
	// }
};

/*
Configure the express app so that it can 
1. Parse JSON POST requests
2. Set up middleware to route to the correct address
*/
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(auth);
app.use("/", router);

// listen on the port
app.listen(port, function () {
	console.log("Server started on port: " + port);
});
