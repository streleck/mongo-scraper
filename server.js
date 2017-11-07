// Dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var PORT = process.env.PORT || 3000
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

//connect to mongoose
mongoose.connect("mongodb://heroku_69zr21nh:ij6fa2cif86hcctolcou6qeiu6@ds149905.mlab.com:49905/heroku_69zr21nh");
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
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});