const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    description: String,
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);