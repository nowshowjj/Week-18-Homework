//Required
var mongoose = require("mongoose");

var Schema = mongoose.Schema;


//Model tables
var NewsSchema = new Schema({

  headline:{
    type: String,
    trim: true
  },

  summery: {
    type: String,
    trim: true
  },

  byline: {
    type: String,
    trim: true
  }

}); // end of NewsSchema



//Name of Schema
var News = mongoose.model("News", NewsSchema);

module.exports = News;



