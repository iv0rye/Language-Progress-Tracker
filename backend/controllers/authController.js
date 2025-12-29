const User = require("../models/user");
const jwt = require("jsonwebtoken");

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
}

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

module.exports = {
    register: async (req, res) => {
        try {
            let { username, email, password } = req.body;

            let userDoc = new User({
                username: username,
                email: email,
                password: password
            });

            await userDoc.save();
            res.status(200).json({ id: userDoc._id });
        } catch (err) {
            res.status(422).json({ error: err.message });
        }
    },
    logIn: async (req, res) => {

    }
}