'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    
    static associate(models) {
    models.Posts.belongsTo(models.Users,{ foreignKey:"userId"}),
      models.Posts.hasMany(models.Comments);

      
    }
  };


  Posts.init({
    userId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    media: DataTypes.STRING,
    likes: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};