// controllers/productController.js
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

// Danh sách sản phẩm + lọc
exports.index = async(req, res) => {
    try {
        const { q, supplier } = req.query || {};
        let filter = {};

        if (q) filter.name = { $regex: q, $options: "i" };
        if (supplier) filter.supplier = supplier;

        const products = await Product.find(filter).populate("supplier");
        const suppliers = await Supplier.find();

        res.render("products/index", {
            products,
            suppliers,
            q: q || "",
            supplier: supplier || ""
        });
    } catch (err) {
        console.error("Error in product index:", err);
        res.status(500).send("Internal Server Error");
    }
};

// Form thêm
exports.createForm = async(req, res) => {
    const suppliers = await Supplier.find();
    res.render("products/form", { suppliers });
};

// Tạo mới
exports.create = async(req, res) => {
    try {
        await Product.create(req.body);
        res.redirect("/products");
    } catch (err) {
        console.error("Create product error:", err);
        res.status(500).send("Error creating product");
    }
};

// Form sửa
exports.editForm = async(req, res) => {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find();
    res.render("products/form", { product, suppliers });
};

// Cập nhật
exports.update = async(req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/products");
    } catch (err) {
        console.error("Update product error:", err);
        res.status(500).send("Error updating product");
    }
};

// Xóa
exports.delete = async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect("/products");
    } catch (err) {
        console.error("Delete product error:", err);
        res.status(500).send("Error deleting product");
    }
};