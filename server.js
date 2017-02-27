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
