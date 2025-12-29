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
        try {
            let { email, password } = req.body;

            const user = await User.findOne({
                email: email
            }).select("+password");

            if (!user) {
                res.status(401).json({ message: "Account was not found" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                res.status(401).json({ message: "Account was not found" });
            }

            const token = generateToken(user._id);

            res.cookie('token', token, cookieOptions);

            res.status(200).json({
                user: {
                    username: username,
                    email: email
                }
            })
        } catch (err) {
            res.status(422).json({ error: err.message });
        }
    },
    logOut: async (req, res) => {
        try {
            res.cookie("token", '', { ...cookieOptions, maxAge: 1 })
            res.status(200).json({ message: "Logged out successfully" });
        } catch(err) {
            res.status(422).json({ error: err.message });
        }
    },
    returnCurrentUser: async (req, res) => {
        try {
            res.status(200).json(req.user);
        } catch (err) {
            res.status(422).json({ error: err.message });
        }
    }
}