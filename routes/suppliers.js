const router = require("express").Router();
const { ensureAuth } = require("../middleware/auth");
const supplierCtrl = require("../controllers/supplierController");

// Ai cũng xem được
router.get("/", supplierCtrl.index);

// CRUD (cần đăng nhập)
router.get("/create", ensureAuth, supplierCtrl.createForm);
router.post("/create", ensureAuth, supplierCtrl.create);

router.get("/:id/edit", ensureAuth, supplierCtrl.editForm);
router.post("/:id/edit", ensureAuth, supplierCtrl.update);

router.post("/:id/delete", ensureAuth, supplierCtrl.delete);

module.exports = router;