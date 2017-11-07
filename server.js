// Dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

//connect to mongoose
mongoose.connect("mongodb://localhost/mongoscraper");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.use(bodyParser.urlencoded({
  extended: false
}));
// Make public a static dir
app.use(express.static("public"));

//routes
require("./routes/scraper-routes.js")(app);
require("./routes/post-routes.js")(app);
require("./routes/get-routes.js")(app);


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});