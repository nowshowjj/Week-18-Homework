 // Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var exphbs = require("express-handlebars");

// Express
var app = express();

// Use morgan and body-parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());



app.use(express.static("public"));


// Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Required the routes
var routes = require("./routes/html-routes.js");


// Begin Routes
app.use('/', routes);



var port = process.env.PORT || 3000;
// Listen on port 3000
app.listen(port, function() {
  console.log("App running on port 3000!");
});
 