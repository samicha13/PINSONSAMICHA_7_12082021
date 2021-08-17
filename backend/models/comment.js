const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');


// Création du modèle 'Post'
const Comment = sequelize.define('Comment', {
  idUser: DataTypes.INTEGER,
    idPosts: DataTypes.INTEGER,
    comment: DataTypes.STRING
});

// Création de la table 'users'
Comment.sync()
    .then(() => console.log("La table model pour Comment est créé"))
    .catch(error => console.log(error));

module.exports = Comment;