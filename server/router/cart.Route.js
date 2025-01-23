const { Router } = require("express");
const { getByUserId, addTocart, removeTocart, addQuantity, removeQuantity } = require("../controller/cart.controller");
const { decode } = require("../middleware/decodeJwt");

const cartRoute = Router();

cartRoute.get("/", decode, getByUserId);
cartRoute.post("/", decode, addTocart);
cartRoute.delete("/:cartId", decode, removeTocart);
cartRoute.patch("/add-qty/:cartId", decode, addQuantity);
cartRoute.patch("/remove-qty/:cartId", decode, removeQuantity);

module.exports = cartRoute;