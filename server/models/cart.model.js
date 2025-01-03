const { default: mongoose } = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User", require: true },
    product: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
    qty: { type: Number, default: 1 }
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;