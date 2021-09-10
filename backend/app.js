
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const rateLimit = require("express-rate-limit");
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const helmet = require('helmet');
app.use(helmet());




const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100 // limit each IP to 100 requests per windowMs
  });
  
  //  apply to all requests
  app.use("/api/",apiLimiter);

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	next();
});

app.use('/images', express.static('images'))


app.use(bodyParser.json());



//User routes
app.use('/api/auth',userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts/", commentRoutes);

module.exports = app;