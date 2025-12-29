const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

const authRouter = require("./routes/authRoutes");

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.set("port_number", process.env.PORT);

const DB_URL = process.env.DB_URL;

async function connectDb(url){
    await mongoose.connect(url);
    return ("Connected succesfully to mongoDb");
}

connectDb(DB_URL)
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