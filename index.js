// **************************************************
// Require dotenv to import environment variables
require("dotenv").config();

// **************************************************
// Load models
const Site = require("./models/site.model.js");
const siteRoute = require("./routes/site.route.js");

// **************************************************
// Require express for routing
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/sites", siteRoute);

// **************************************************
// Require reload for auto development updates
const reload = require('reload');

// **************************************************
// Connect to MongoDB database using Mongoose
const mongoose = require("mongoose");

mongoose.set("debug", true);

const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + 
    ":" + process.env.MONGODB_PASSWORD + 
    "@" + process.env.MONGODB_CLUSTER + 
    ".ywr5i.mongodb.net/" + process.env.MONGODB_DATABASE + 
    "?retryWrites=true&w=majority&appName=" + process.env.MONGODB_APP;

mongoose.connect(uri)
.then(() => {
    console.log(`MongoDB Connected: {conn.connection.host}`);
})
.catch(() => {
    console.error(error.message);
    process.exit(1);
});

// **************************************************
// Initializse app
app.listen(process.env.PORT, () => {

    console.log("Server is running on port " + process.env.PORT);

});

// **************************************************
// Add routes
app.get("/", (req, res) => {

    res.send("<h1>Hello World!</h1><script src=\"/reload/reload.js\"></script>");

});

// **************************************************
// Sites API routes
app.get("/api/sites", async (req, res) => {
    try{
        const sites = await Site.find({approved: true});
        res.status(200).json(sites);
    }catch(error) {
        res.status(500).json({message: error.message});
    }
});
app.get("/api/sites/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const site = await Site.findById(id);
        res.status(200).json(site);
    }catch(error) {
        res.status(500).json({message: error.message});
    }
});
app.post("/api/sites", async (req, res) => {
    try{
        const site = await Site.create(req.body);
        res.status(200).json(site);
    }catch(error) {
        res.status(500).json({message: error.message});
    }
});

reload(app);
