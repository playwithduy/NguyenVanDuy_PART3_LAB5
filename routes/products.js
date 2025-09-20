// routes/products.js
const router = require("express").Router();
const productCtrl = require("../controllers/productController");
const { ensureAuth } = require("../middleware/auth");

// Ai cũng xem được danh sách sản phẩm
router.get("/", productCtrl.index);

// CRUD (cần đăng nhập)
router.get("/create", ensureAuth, productCtrl.createForm);
router.post("/create", ensureAuth, productCtrl.create);

router.get("/:id/edit", ensureAuth, productCtrl.editForm);
router.post("/:id/edit", ensureAuth, productCtrl.update);

router.post("/:id/delete", ensureAuth, productCtrl.delete);

module.exports = router;