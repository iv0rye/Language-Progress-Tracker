const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, "This username is taken!"],
        required: [true, "A username is required!"],
        minlength: [3, "Username must be at least 3 characters!"],
        maxlength: [15, "Username exceeds 15 characters!"]
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

// Hashing password before saving to database
userSchema.pre("save", async (next) => {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

module.exports = mongoose.model("User", userSchema);