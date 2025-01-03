const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
    profile: { type: String },
})

const User = mongoose.model("user", userSchema);
module.exports = User;