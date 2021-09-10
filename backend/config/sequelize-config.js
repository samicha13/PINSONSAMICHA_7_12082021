const Sequelize = require('sequelize');
require('dotenv').config();

// Connexion à la base de donnée
const sequelize = new Sequelize("Groupomania", "root", "password", {
  dialect: "mysql",
  host: "localhost"
});
  
sequelize.authenticate()
  .then(() => console.log('Connecté à la base de donnée MySQL!'))
  .catch(error => console.error('Impossible de se connecter, erreur suivante :', error));

module.exports = sequelize;