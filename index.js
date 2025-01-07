// **************************************************
// Require dotenv to import environment variables
require("dotenv").config();

// **************************************************
// Require express for routing
const express = require("express");
const app = express();

// **************************************************
// Require reload for auto development updates
const reload = require('reload')

// **************************************************
// Connect to MongoDB database using Mongoose
const mongoose = require("mongoose");
const uri = 'mongodb+srv://' + process.env.MONGODB_USERNAME + 
    ':' + process.env.MONGODB_PASSWORD + 
    '@' + process.env.MONGODB_CLUSTER + 
    '.ywr5i.mongodb.net/?retryWrites=true&w=majority&appName=' + process.env.MONGODB_APP;

mongoose.connect(uri)
.then(() => {

    console.log("Connection successful");

    // **************************************************
    // Initializse app
    app.listen(3000, () => {

        console.log("Server is running on port 3000");

    });

})
.catch(OP => {

    console.log("Connection failed");

});

// **************************************************
// Add routes
app.get("/", (req, res) => {

    res.send("hello! 22  <script src=\"/reload/reload.js\"></script>");

});

reload(app);
