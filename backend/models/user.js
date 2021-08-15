
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

// Création du modèle 'User'
const User = sequelize.define('User', {
    prenom: DataTypes.STRING,
    nom: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
});

// Création de la table 'users'
User.sync()
    .then(() => console.log("The table for the User model is created"))
    .catch(error => console.log(error));

module.exports = User;