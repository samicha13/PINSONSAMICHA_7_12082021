// Import des constantes
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete('/:id',auth, userCtrl.deleteUser);
router.get('/:id', auth, userCtrl.getUser);
router.get('/', auth, userCtrl.getAllUsers);
router.get('/user/me', userCtrl.getUsersInfos);
module.exports = router;