
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');




app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	next();
});

app.use(bodyParser.json());



//User routes
app.use('/api/auth',userRoutes);
app.use("/api/posts", postRoutes);


module.exports = app;