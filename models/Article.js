var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Schema Name
var ArticleSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },
  // Saves one note's ObjectId, ref to Note model
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export
module.exports = Article;
