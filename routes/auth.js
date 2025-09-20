const router = require("express").Router();
const authCtrl = require("../controllers/authController");

router.get("/register", authCtrl.getRegister);
router.post("/register", authCtrl.postRegister);
router.get("/login", authCtrl.getLogin);
router.post("/login", authCtrl.postLogin);
router.get("/logout", authCtrl.logout);

module.exports = router;