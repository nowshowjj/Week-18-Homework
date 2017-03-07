// require mongoose
var mongoose = require('mongoose');

//Mongoose promises
var Promise = require('bluebird');
mongoose.Promise = Promise;

//db configuration
mongoose.connect("mongodb://123:123@ds119380.mlab.com:19380/heroku_8n8jg9gb");
var db = mongoose.connection;

//mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

//success message if successfull 
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

module.exports = db;