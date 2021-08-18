
const models = require("../models/comment");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const modelsUser = require('../models/user');

//Créer un commentaire
exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TK_SESSION);
    const userId = decodedToken.userId;
  
    if ( !req.body.comment  ||req.body.comment === "" ) { // on vérifie que le commentaire n'est pas vide et bien existant
      return res
        .status(400)
        .json({ error: "Veuillez remplir le champ commentaire." });
    }
  
    models.create({
      idUser: userId,
      idPosts: req.params.id,
      comment: req.body.comment,
    })
      .then(() => res.status(200).json({ message: "Commentaire enregistré !" }))
      .catch(() => res.status(400).json({ error: "Commentaire non créé" }));
  };


// efacer un commentaire
  exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TK_SESSION);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
  
    models.findOne({
      where: {
        idPosts: req.params.idPosts ,
        id: req.params.id,
      },
    }).then((comment) => {
      if (comment.idUser === userId || isAdmin === true) {
        comment
          .destroy()
          .then(() => {
            res.status(200).json({
              message: "Commentaire supprimé !",
            });
          })
          .catch((error) => {
            res.status(400).json({
              error: error,
              message: "Le commentaire n'a pas pu être supprimé",
            });
          });
      }
    });
  };

  //Obtenir tout les commentaires 

  exports.getAllComments = (req, res, next) => {
    modelsUser.hasMany(models, {foreignKey: 'idUsers'});
models.belongsTo(modelsUser, {foreignKey: 'idUsers'});
    models.findAll({
      where: {
        idPosts: req.params.id,
      },
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: modelsUser,
          attributes: ["comment","prenom","nom"],
        },
      ],
    })
      .then((comments) => {
        res.status(200).json(comments);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  };