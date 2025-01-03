const { Schema, default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    img: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;