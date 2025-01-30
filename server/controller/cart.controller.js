const Razorpay = require("razorpay");
const Cart = require("../models/cart.model");
require("dotenv").config();

const getByUserId = async (req, res) => {
    console.log(req.user);
    const userId = req.user.id;
    console.log(userId);
    try {
        let cart = await Cart.find({ user: userId }).populate("product");
        console.log("cart", cart);
        res.send(cart);
    } catch (error) {
        console.log("error", error);
        res.status(500).send({ error: error.message });
    }
};

const addTocart = async (req, res) => {
    console.log(req.body, req.user);
    req.body.user = req.user.id;

    const { user, product } = req.body;
    try {
        let isExits = await Cart.findOne({ user: user, product: product });
        if (isExits) {
            isExits.quantity += 1;
            await isExits.save();
            return res.send(isExits);
        }
        else {
            let cart = await Cart.create(req.body);
            res.send(cart);
        }
    } catch (error) {
        res.send({ error: error.message });
    }
};

const removeTocart = async (req, res) => {

    const { cartId } = req.params;
    try {
        let cart = await Cart.findByIdAndDelete(cartId);
        res.send(cart);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

const addQuantity = async (req, res) => {
    let { cartId } = req.params;
    try {
        let cart = await Cart.findById(cartId);
        cart.qty += 1;
        await cart.save();
        res.send(cart);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

const removeQuantity = async (req, res) => {
    let { cartId } = req.params;
    try {
        let cart = await Cart.findById(cartId);
        if (cart.qty >= 2) {
            cart.qty -= 1;
            await cart.save();
            res.send(cart);
        }
        else {
            cart = await Cart.findByIdAndDelete(cartId);
            res.status(200).send(cart);
        }
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_h6BhrSoCcUOci6",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "8SOZkHUH7soFstcSMNBsPrYN",
});

const checkout = async (req, res) => {
    const { amount } = req.body;
    if (!amount || isNaN(amount)) {
        return res.status(400).send({ error: "Invalid amount" });
    }

    const options = {
        amount: amount * 100,
        currency: "INR",
    };

    try {
        const order = await razorpay.orders.create(options);
        res.status(200).send(order);
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).send({ error: error.message });
    }
};


module.exports = {
    getByUserId,
    addTocart,
    removeTocart,
    addQuantity,
    removeQuantity,
    checkout,
};