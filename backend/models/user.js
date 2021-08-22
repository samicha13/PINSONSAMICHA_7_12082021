
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

// Création du modèle 'User'
const User = sequelize.define('User', {
    prenom: DataTypes.STRING,
    nom: DataTypes.STRING,
    password: DataTypes.STRING,
    email: { 
        type: DataTypes.STRING,
        unique: true,

    },
    isAdmin: DataTypes.BOOLEAN
});

// Création de la table 'users'
User.sync()
    .then(() => console.log("La table model pour User est crée"))
    .catch(error => console.log(error));

module.exports = User;