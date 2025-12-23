const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, "This username is taken!"],
        required: [true, "A username is required!"]
    },
    email: {
        type: String,
        validate: {
            validator: (value) => {
                return value.includes("@") && value.includes(".");
            },
            message: "Please provide a valid email address"
        },
        lowercase: true,
        unique: [true, "This email already exists!"],
        required: [true, "An email is required!"]
    },
    password: {
        type: String,
        required: [true, "A password is required!"],
        minlength: [8, "Password must be at least 8 characters!"],
        select: false
    }
})

module.exports = mongoose.model("User", userSchema);