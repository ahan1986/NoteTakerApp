const express = require("express"), mongojs = require("mongojs"), bodyParser = require("body-parser"), logger = require("morgan"), app = express();

app.use(logger("dev"));

// Setup the app with body-parser and a static folder
app.use(bodyParser.urlencoded({
    extended: false
    })
);
app.use(express.static("public"));

// =============== Mongo ===============
// Database configuration
const databaseUrl = "notetaker", collections = ["notes"];

// Hook mongojs config to db variable
const db = mongojs(databaseUrl, collections);

// Log any mongojs errors to console
db.on("error", (error) => {
    console.log("Database Error:", error);
});

// =============== Routes ===============

// Simple index route
app.get("/", (res, req)=>{
    res.send(index.html); // res.send to index.html does nothing. You can add whatever and delete it and it will not display it on to the browser.
});

//Handle form submission, save submission to mongo
