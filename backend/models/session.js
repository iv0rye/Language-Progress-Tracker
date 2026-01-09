const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Provide a user for the session"],
        index: true
    },
    totalTime: {
        type: Number,
        validate: {
            validator: (value) => {
                return value > 5;
            },
            message: "Session time is 5 seconds or shorter!"
        },
        required: [true, "Provide total time"]
    },
    category: {
        type: String,
        required: [true, "Provide a category"],
        trim: true
    },
    date: {
        type: Date,
        required: [true, "Provide a date"],
        default: Date.now
    }
})

module.exports = mongoose.model("Session", sessionSchema);