 //Requires
var express = require('express');
var router = express.Router();

//Models
var Article = require("../models/Article");
var Note = require("../models/Note");
var site_scraper = require('../scraper/scrape');


// Routes

// Home page will display articles we scraped from the mongoDB
  router.get('/', function(req, res) {
    console.log('! You have been discovered !');
      
    Article.find({}, function(err, doc) {
      if (err) console.log("There is a error: ", error);
      
      res.render('index', {title: "Scraper", articles: doc});
    });
  });





router.get('/scrape', function(req, res) {

  //Custome function
  site_scraper.site_scraper(function() {
    res.redirect('/');
  });
});


  // Grab an article by it's ObjectId
router.get('/note/:id', function(req, res) {
  Article.findOne({_id: req.params.id})
    .populate("note")
    .exec(function(err, doc) {
      if (err) console.log("There is an error getting this Note: ", error);
      res.send(doc.note);
      // console.log(doc.note);
    });
});





// new note
router.post('/new_note/:id', function(req, res) {

  var new_note = new Note(req.body);
  new_note.save(function(err, doc) {

// find and update 
    Article.findOneAndUpdate(
      {_id: req.params.id},
      {$push: {note: doc._id}},
      {new: true},

      function(err, new_document) {
        if (err) console.log("An error has occured", error);
        res.send(new_document);
      });
  });
});







router.post('/delete_note/:id', function(req, res) {
  console.log(req.params.id);
  
  Note.findByIdAndRemove({_id: request.params.id}, function(err) {
    if (err) console.log('This note cannot be deleted: ', error);
    res.send();
  });
})




module.exports = router;