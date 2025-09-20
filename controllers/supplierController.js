const Supplier = require("../models/Supplier");

// Danh sách
exports.index = async(req, res) => {
    try {
        const q = req.query.q || "";
        const selectedSupplier = req.query.supplier || "";

        const suppliers = await Supplier.find().sort("name");

        res.render("suppliers/index", {
            suppliers,
            q, // <-- đảm bảo q luôn có
            supplier: selectedSupplier // <-- tên biến giữ nguyên để view dùng
        });
    } catch (err) {
        console.error("Supplier index error:", err);
        res.status(500).send("Server error");
    }
};
// Form thêm
exports.createForm = (req, res) => {
    res.render("suppliers/form", { supplier: {} });
};

// Thêm
exports.create = async(req, res) => {
    await Supplier.create(req.body);
    res.redirect("/suppliers");
};

// Form sửa
exports.editForm = async(req, res) => {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.redirect("/suppliers");
    res.render("suppliers/form", { supplier });
};

// Cập nhật
exports.update = async(req, res) => {
    await Supplier.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/suppliers");
};

// Xóa
exports.delete = async(req, res) => {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect("/suppliers");
};