const Session = require("../models/session");

module.exports = {
    addSession: async (req, res) => {
        try {
            console.log(req.body)
            const { totalTime, category, date } = req.body;

            const sessionDoc = new Session({
                user: req.user.id,
                totalTime,
                category,
                date
            })

            await sessionDoc.save();

            res.status(200).json({ id: sessionDoc._id });
        } catch (err) {
            res.status(422).json({ error: err.message });
        }
        


    }
}