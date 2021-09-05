
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

  //modification d'un commentaire
exports.updateComment = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TK_SESSION);
  const userId = decodedToken.userId;
  const isAdmin = decodedToken.isAdmin;
  
    if (!req.body.comment || req.body.comment === "") {
        return res.status(400).json({ error: "Aucun contenu" });
    }

    models.findOne({ where: { id: req.body.id ,
    } })
      .then((comment) => {
        if (comment === null) {
          return res.status(400).json({ error: "Le message demandé n'existe pas" });
        }
        if (comment.idUser === userId || isAdmin === true) {

   models.update({ comment: req.body.comment }, {
        where: { id: req.body.id }
    })
        .then(() => {res.status(200).json({ message: "Comment modifié" });
      });
      }
      else{
      res.status(401).json({message:"vous n'avez pas les droits nécessaires pour modifier le commentaire"});
    }
    
  }); 
  };
  

// efacer un commentaire
  exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TK_SESSION);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
  
    models.findOne({
      where: {
       // idPosts: req.params.idPosts ,
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
      else {
        res.status(401).json({message:"vous n'avez pas les droits nécessaires pour supprimer le commentaire"});
      }
    });
  };

  exports.getAllComments = (req, res, next) => {
    modelsUser.hasMany(models, {foreignKey: 'idUser'});
models.belongsTo(modelsUser, {foreignKey: 'idUser'});
    models.findAll({
      where: {
        idPosts: req.params.id,
      },
      order: [["updatedAt", "DESC"]],
      attributes: ["comment"],
      include: [
        {
          model: modelsUser,
          attributes: ["prenom","nom"],
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