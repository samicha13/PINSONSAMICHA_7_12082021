require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');


const { Sequelize } = require('sequelize');

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


// Connexion à la base de donnée

const sequelize = new Sequelize("Groupomania", "root", "password", {
  dialect: "mysql",
  host: "localhost"
});

try {
  sequelize.authenticate();
  console.log('Connecté à la base de donnée MySQL!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}


//User routes
app.use('/api/auth',userRoutes);


module.exports = app;