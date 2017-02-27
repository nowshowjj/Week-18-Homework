//Required
var mongoose = require("mongoose");

var Schema = mongoose.Schema;


//Model tables
var UsersSchema = new Schema({

  user:{
    type: String,
    trim: true
  },

  comment: {
    type: String,
    trim: true
  }

}); // end of UsersSchema



//Name of Schema
var Users = mongoose.model("Users", UsersSchema);

module.exports = Users;

