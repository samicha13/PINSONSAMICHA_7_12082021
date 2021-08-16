//Constante à importer
const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

// Routes pour les posts 
//router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, multer, postCtrl.createPost);
//router.delete("/:id", auth, postCtrl.deletePost);
//router.post("/:id/like", auth, messageCtrl.likes);

module.exports = router;