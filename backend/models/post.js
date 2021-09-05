
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const modelsUser = require('../models/user');
const modelsComment = require('../models/comment');

// Création du modèle 'Post'
const Post = sequelize.define('Post', {
    titre: DataTypes.STRING,
    message: DataTypes.STRING,
    media: DataTypes.STRING,
    usersLikes: DataTypes.STRING,
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    idUsers: DataTypes.INTEGER,
});

modelsUser.hasMany(Post, {foreignKey: 'idUsers'});
  Post.belongsTo(modelsUser, {foreignKey: 'idUsers'});

  modelsComment.belongsTo(Post, {foreignKey: 'idPosts'});
  Post.hasMany(modelsComment, {foreignKey: 'idPosts'});

  modelsUser.hasMany(modelsComment, {foreignKey: 'idUser'});
  modelsComment.belongsTo(modelsUser, {foreignKey: 'idUser'});

// Création de la table 'users'
Post.sync()
    .then(() => console.log("La table model pour Post est créé"))
    .catch(error => console.log(error));

module.exports = Post;