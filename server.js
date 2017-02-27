//Requires
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require('cheerio');
var request = require('request');

mongoose.Promise = Promise;


// Model names
var News = require("./news.js");
var Users = require("./users.js");

//Express
var app = express();


//Body-parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

//Setting Static public
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/NewsScrapper");

//Mongoose set to db
var db = mongoose.connection;


//Mongoose error
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});


//This is where scrapper content goes
app.post("/scrapper", function(req, res) {});




// Listening port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});