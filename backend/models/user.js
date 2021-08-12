
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    
    static associate(models) {
      models.Users.hasMany(models.Posts, {foreignKey: "userId"});
      models.Users.hasMany(models.Comments);
      
     
    }
  };
  Users.init({
    prenom: DataTypes.STRING,
    nom: DataTypes.STRING,
    password: DataTypes.STRING,
   email: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
   
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
