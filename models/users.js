//Required
var mongoose = require("mongoose");

var Schema = mongoose.Schema;


//Model tables
var UsersSchema = new Schema({

  user:{
    type: String,
    trim: true,
    required: "Name can not be left blank"
  },

  comment: {
    type: String,
    trim: true,
    required: "Comment cannot be left blank"
  }

}); // end of UsersSchema



//Name of Schema
var Users = mongoose.model("Users", UsersSchema);

module.exports = Users;

