const express = require("express");
const app = express();

const reload = require('reload')

app.listen(3000, () => {

    console.log("Server is running on port 3000");


});

app.get("/", (req, res) => {

    res.send("hello! 22  <script src=\"/reload/reload.js\"></script>");

});

reload(app);