const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middlewares/auth");

router.post("/:id/comment/", auth, commentCtrl.createComment);
//router.get("/:id/comments", auth, commentCtrl.getAllComments);
//router.delete("/:idPosts/comment/:id", auth, commentCtrl.deleteComment);

module.exports = router;