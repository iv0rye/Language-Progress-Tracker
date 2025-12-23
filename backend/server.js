const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const authRouter = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

app.set("port_number", 8080);

const URL = "mongodb://127.0.0.1:27017/productivity-app";

async function connectDb(url){
    await mongoose.connect(url);
    return ("Connected succesfully");
}

connectDb(URL)
    .then(console.log)
    .catch((err) => console.log(err));

app.use("/api/auth", authRouter);

app.listen(app.get("port_number"), (err) => {
    if (err){
        console.log(err);
        return;
    }
    console.log(`listening on port ${app.get("port_number")}`);
});