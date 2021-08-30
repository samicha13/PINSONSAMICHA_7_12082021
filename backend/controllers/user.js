const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../models/user");
const sequelize = require('../config/sequelize-config');
require("dotenv").config();
const auth = require("../middlewares/auth");

const email_reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const password_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})/;

// Création d'un compte 

exports.signup = (req, res, next) => {
  if ( // condition on vérifie l'existence de l'objet et s'il n'est pas vide
    !req.body.email  ||
    !req.body.nom ||
    !req.body.prenom ||
    !req.body.password ||
    req.body.email == "" ||
    req.body.nom == "" ||
    req.body.prenom == "" ||
    req.body.password == ""
  ) {
    return res
      .status(400)
      .json({ error: "Merci de remplir tous les champs !" });
  }
  if (!email_reg.test(req.body.email)) {
    return res.status(400).json({ error: "Email incorrect !" });
  }
  if (!password_reg.test(req.body.password)) {
    return res.status(401).json({
      error:
        "Minimum: 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère (!.@#$%^&*)",
    });
  }


  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
        password: hash,
        isAdmin: false,
      };
      models.create(user)
        .then((user) => {
          res.status(201).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            message: "Utilisateur créé !"
          });
        })
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => res.status(500).json({ error: error }));
};

// conexion a son compte 
exports.login =  (req, res, next) => {
  if (!req.body.email || !req.body.password ) {
    return res
      .status(400)
      .json({ error: "Merci de remplir tous les champs !" });
  }

models.findOne({ where: {email: req.body.email }})
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur introuvable !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            nom: user.nom,
            prenom: user.prenom,
            token: jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, 
              process.env.TK_SESSION, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};


//suppresion d'un compte



exports.deleteUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TK_SESSION);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;

    models.findOne({
      where: {
        id: req.params.id, 
      },
    }).then((user) => {
      if (user.id === userId || isAdmin === true) {
        user
          .destroy()
          .then(() => {
            res.status(200).json({
              message: "Compte supprimé !",
            });
          })
          .catch((error) => {
            res.status(400).json({
              error: error,
              message: "Le compte n'a pas pu être supprimé",
            });
          });
      }
      else {
        res.status(401).json({message:"vous n'avez pas les droits nécessaires pour supprimer le compte"});
      }
    });
  };

  exports.getUser = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TK_SESSION);
    const userId = decodedToken.userId;
  
    models.findOne({
      where: {
        id: req.params.id
      } 
    })
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: "Utilisateur introuvable !" });
        }
        if (user.id !== decodedToken.userId) {
          return res.status(401).json({ error: "Vous n'avez pas les droits nécessaires pour afficher ces informations."});
        }
        res.status(200).json(user);
      })
      .catch(error => res.status(500).json({ error }));
  }