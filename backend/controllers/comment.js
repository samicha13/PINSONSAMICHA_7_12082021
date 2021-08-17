
const models = require("../models/comment");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Créer un commentaire
exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TK_SESSION);
    const userId = decodedToken.userId;
  
    if (req.body.comment === "") {
      return res
        .status(400)
        .json({ error: "Veuillez remplir le champ commentaire." });
    }
  
    models.Comment.create({
      idUser: userId,
      idPosts: req.params.id,
      comment: req.body.comment,
    })
      .then(() => res.status(200).json({ message: "Commentaire enregistré !" }))
      .catch(() => res.status(400).json({ error: "Commentaire non créé" }));
  };