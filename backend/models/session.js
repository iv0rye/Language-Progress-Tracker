const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    user: {
        type: Types.objectId,
        ref: "User",
        required: [true, "Provide a user for the session"]
    },
    totalTime: {
        type: Number,
        validate: {
            validator: (value) => {
                return value > 5;
            },
            message: "Session time is too short!"
        },
        required: [true, "Provide total time"]
    },
    category: {
        type: String,
        required: [true, "Provide a category"]
    },
    date: {
        type: String,
        required: [true, "Provide a date"]
    }
})

module.exports = mongoose.model("Session", sessionSchema);