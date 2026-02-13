require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const route = require('./Routes/routes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://group21Database:f8HsIED1oiOyc6yi@karthikcluster.b2ikjot.mongodb.net/MissionIndiaMart",
    
)
    .then(() => console.log("mongoDB is connected."))
    .catch((err) => console.log(err));

app.use("/", route);



let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Express app is running on port " + port);
});