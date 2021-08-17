
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');


// Création du modèle 'Post'
const Post = sequelize.define('Post', {
    titre: DataTypes.STRING,
    message: DataTypes.STRING,
   media: DataTypes.STRING,
 userLikes: DataTypes.INTEGER, 
 likes: {
     type: DataTypes.INTEGER,
 defaultValue: 0
},
 idUsers: DataTypes.INTEGER,
});

// Création de la table 'users'
Post.sync()
    .then(() => console.log("La table model pour Post est créé"))
    .catch(error => console.log(error));

module.exports = Post;