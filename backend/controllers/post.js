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
  
    if (!req.body.message || req.body.message === "") {
        return res.status(400).json({ error: "Aucun contenu" });
    }

   models.update({ message: req.body.message }, {
        where: { id: req.body.id }
    })
        .then(() => res.status(200).json({ message: "Post modifié" }))
        .catch(error => res.status(500).json({ error }));
};


//  effacer le post
exports.deletePost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TK_SESSION);
  const userId = decodedToken.userId;
  const isAdmin = decodedToken.isAdmin;
    models.findOne({ where: { id: req.body.id ,
      idUsers: userId,} })
        .then((post) => 
       
        {if (post.idUser === userId || isAdmin === true) {
          post.destroy()
.then(() => {
   res.status(200).json({ message: "Post supprimé" });
});
        }
else{
         
  res.status(401).json({message:"vous n'avez pas les droits nécessaires pour supprimer le post"});
}
}); 
};


// voir tout les posts

exports.getAllPosts = (req, res, next) => {
    modelsUser.hasMany(models, {foreignKey: 'idUsers'});
models.belongsTo(modelsUser, {foreignKey: 'idUsers'});
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
          model: modelsUser, // recuperer le nom et prénom de la personne qui post
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

    modelsUser.hasMany(models, {foreignKey: 'idUsers'});
    models.belongsTo(modelsUser, {foreignKey: 'idUsers'});
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
      include: [
        {
          model: modelsUser, // recuperer le nom et prénom de la personne qui post
          attributes: ["nom", "prenom"],
        },
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
    const postId = req.params.id;
  
    if (like === 1) {
    models.findOne({ where: { id: req.params.id }})
      .then((post) => 
      {
        if (post != null)
        {
          models.increment(
            { likes: +1 },
            { where: { id: postId }}
          )
            .then(() => {
              models.update(
                { userLikes: userId },
                { where: { id: postId }}
              )
                .then(() => res.status(200).json({ message: "Like ajouté" }))
                .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(400).json({ error }));
        } else
        {
          res.status(400).json({ error: "Le message demandé n'existe pas" });
        }
      })
      .catch(error => res.status(500).json({ error }));
    }
  };
   












