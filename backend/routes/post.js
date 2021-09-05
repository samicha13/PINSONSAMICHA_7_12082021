//Constante à importer
const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

// Routes pour les posts 
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, multer, postCtrl.createPost);
router.put('/', auth, postCtrl.updatePost);
router.delete('/', auth, postCtrl.deletePost);
router.post("/:id/like", auth, postCtrl.likePost);
router.get("/", auth, postCtrl.getAllPosts);
router.get("/myposts/get", auth, postCtrl.getMyPosts);

module.exports = router;