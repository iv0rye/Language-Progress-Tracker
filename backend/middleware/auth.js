const jwt = require("jsonwebtoken");
const User = require("../models/user");

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
}