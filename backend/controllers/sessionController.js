const Session = require("../models/session");

module.exports = {
    addSession: async (req, res) => {
        try {
            const { totalTime, category, date } = req.body;

            const sessionDoc = new Session({
                user: req.user.id,
                totalTime,
                category,
                date
            })

            await sessionDoc.save();

            res.status(200);
        } catch (err) {
            res.status(422).json({ error: err.message });
        }
        


    }
}