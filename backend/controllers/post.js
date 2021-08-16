const models = require('../models/post');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const modelsUser = require('../models/user');
const { post } = require('../routes/user');

// Creation d'un post 
exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TK_SESSION);
  const userId = decodedToken.userId;

  if ( !req.body.titre  ||!req.body.message  || req.body.titre === "" || req.body.message === "") {
    return res.status(400).json({ error: "Merci de remplir tous les champs." });
  }

  models.create({
    idUsers: userId,
    titre: req.body.titre,
    message: req.body.message,
    media:
      req.body.message && req.file
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : null,
  })
    .then(() => res.status(201).json({ message: "Post créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

//modification d'un post
exports.updatePost = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TK_SESSION);
    const userId = decodedToken.userId;
    if (!req.body.message) {
        return res.status(400).json({ error: "Aucun contenu" });
    }

   models.update({ message: req.body.message }, {
        where: { idUsers: userId }
    })
        .then(() => res.status(200).json({ message: "Post modifié" }))
        .catch(error => res.status(500).json({ error }));
};


//  effacer le post
exports.deletePost = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TK_SESSION);
      const userId = decodedToken.userId;

    models.destroy({ where: { idUsers: userId } })
        .then(() => res.status(200).json({ message: "Post supprimé" }))
        .catch(error => res.status(500).json({ error }));
};


// voir tout les posts

exports.getAllPosts = (req, res, next) => {
    models.findAll({
      order: [["updatedAt", "DESC"]],
      attributes: [
        "id",
        "idUsers",
        "titre",
        "message",
        "media",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: modelsUser,
          attributes: ["nom", "prenom"],
        },
      ],
    })
      .then((posts) => {
        res.status(200).json(posts);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  };
  
// Avoir un post en particulier

  exports.getOnePost = (req, res, next) => {
    models.findOne({
      attributes: [
        "id",
        "idUsers",
        "titre",
        "message",
        "media",
        "createdAt",
        "updatedAt",
      ],
      where: { id: req.params.id },
    })
      .then((message) => {
        res.status(200).json(message);
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  };

  //gestion like Post

  exports.likePost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TK_SESSION);
    const userId = decodedToken.userId;
    const like = req.body.like;
  
    if (like === 1) {
    models.updateOne(
        { id: postId },
        {
          $push: { usersLikes: userId }, 
          $inc: { likes: +1 },
        }
      );
    }
}













