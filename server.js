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

// clearall the results
app.get("/clearall", (res, req) => {
    db.notes.remove({}, (error, response) => {
        if(error) {
            console.log(error);
            res.send(error);
        } else {
            console.log(response);
            res.send(response);
        }
    });
});

app.get("/delete/:id", ()=> {
    db.notes.remove(
        {
            _id: mongojs.ObjectID(req.params.id)
        }, function(err, doc) {
            if(err) throw err;

            else res.send(doc);
        } 
)
});

// Listen on port 3000
app.listen(3000, ()=> {
    console.log("App is running on port 3000!");
});
