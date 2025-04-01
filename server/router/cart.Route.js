const { Router } = require("express");
const { getByUserId, addTocart, removeTocart, addQuantity, removeQuantity, checkout } = require("../controller/cart.controller");
const { decode } = require("../middleware/decodeJwt");

const cartRoute = Router();

cartRoute.get("/", decode, getByUserId);
cartRoute.post("/", decode, addTocart);
cartRoute.delete("/:cartId", decode, removeTocart);
cartRoute.patch("/add-qty/:cartId", decode, addQuantity);
cartRoute.patch("/remove-qty/:cartId", decode, removeQuantity);
// cartRoute.post("/payment",checkout);

module.exports = cartRoute;