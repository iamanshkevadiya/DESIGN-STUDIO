const { Router } = require('express');
const { getUser, Signup, Login, deleteUser } = require('../controller/user.controller');
const { decode } = require('../middleware/decodeJwt');

const userRouter = Router();

userRouter.get("/", getUser);
userRouter.post("/signup", Signup);
userRouter.post("/login", Login);
userRouter.delete("/:id", decode, deleteUser);

module.exports = { userRouter };