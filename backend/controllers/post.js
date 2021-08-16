const models = require('../models/post');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "Tk_SESSION");
  const userId = decodedToken.userId;

  if (req.body.titre === "" || req.body.message === "") {
    return res.status(400).json({ error: "Merci de remplir tous les champs." });
  }

  models.create({
    idUserpost: userId,
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