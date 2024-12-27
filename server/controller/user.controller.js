const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const Signup = async (req, res) => {

    let { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }
        else {
            let hash = await bcrypt.hash(password, 10);
            req.body.password = hash;
            let user = await User.create(req.body);
            let data = {
                email: user.email,
                id: user.id,
                username: user.username,
            }
            console.log(data);

            let token = await jwt.sign(data, 'private-key');
            console.log(token);

            return res.status(201).json({
                msg: 'user Created',
                token: token,
            });
        }
    } catch (error) {
        res.status(500).json({ msg: "err", error: error.message });
    }
};


const Login = async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: "User not found" });
    }

    let match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ msg: "Invalid Pasword" });
    }
    console.log(req.body, user);
    let data = {
        email: user.email,
        id: user.id,
    }
    let token = await jwt.sign(data, 'private-key');

    return res.status(200).json({
        msg: 'User logged in',
        token: token,
    });
};

const getUser = async (req, res) => {
    let users = await User.find();
    res.status(200).json(users);
};

const deleteUser = async (req, res) => {
    let { id } = req.params;
    try {
        let user = await User.findByIdAndDelete(id);
        res.status(200).json({ msg: "user Deleted", user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "err deleting user", error });
    }
};



module.exports = { Signup, Login, getUser, deleteUser };