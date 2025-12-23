const User = require("../models/user");

module.exports = {
    signUp: async (req, res) => {
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