 //Requires
var express = require('express');
var router = express.Router();

//Models
var Article = require("../models/Article");
var Note = require("../models/Note");
var scrape = require('../scraper/scrape');




// Routes



// Home page will display articles we scraped from the mongoDB
  router.get('/', function(req, res) {
    console.log('hit home!');
      
    Article.find({}, function(error, doc) {
      if (error) console.log("There is a error: ", error);
      
      res.render('index', {title: "Scraper", articles: doc});
    });

  });









// scrape route
router.get('/scrape', function(request, response) {
  // custom function
  scrape.site_scraper(function() {
    res.render('/');
  });

});









  // Grab an article by it's ObjectId
  router.get("/articles/:id", function(req, res) {
    Article.findOne({ "_id": req.params.id })
    .populate("note")
    .exec(function(error, doc) {
      if (error) {
        console.log(error);
      }
      else {
        res.json(doc);
      }
    });
  });





  // Create a new note
  router.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body
    var newNote = new Note(req.body);

    //save the new note
    newNote.save(function(error, doc) {
      // Log errors
      if (error) {
        console.log(error);
      }
     
      else {
        // Use the article id to find Note 
        Article.find({ "_id": req.params.id }, { "note": doc._id })
        // Execute query
        .exec(function(err, doc) {
          // Log errors
          if (err) {
            console.log(err);
          }
          else {
            // send the doc to browser
            res.send(doc);
          }
        });
      }
    });
  });

module.exports = router;