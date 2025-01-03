const { Router } = require('express');
const { getUser, Signup, Login, deleteUser, getAdmins, getUserById } = require('../controller/user.controller');
const { decode } = require('../middleware/decodeJwt');

const userRouter = Router();

userRouter.get("/all-admin", decode, getAdmins);
userRouter.get("/", getUser);
userRouter.get("/:userid", getUserById);
userRouter.post("/signup", Signup);
userRouter.post("/login", Login);
userRouter.delete("/delete/:id", deleteUser);

module.exports = { userRouter };