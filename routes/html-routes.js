var path = require("path");

// Routes

app.get('/', function(req, res) {
	res.render("index", {layout: "main"});
});





app.get("/scrape", function(req, res) {
  //Grabbing data from Echo.
    request("http://www.echojs.com/", function(error, response, html) {
    
    var $ = cheerio.load(html);
    
    //Only grabbing the h2 and relative data
    $("article h2").each(function(i, element) {

      //Empty array for scrape
      var result = {};

      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

      // Saving results to Article
   
      var entry = new Article(result);
      entry.save(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(doc);
        }
      });

    });
  });
  res.send("Check Terminal to see if scraped successful");
});







// This will get the articles we scraped from the mongoDB
app.get("/articles", function(req, res) {

  Article.find({}, function(error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(doc);
    }
  });
});







// Grab an article by it's ObjectId
app.get("/articles/:id", function(req, res) {
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
app.post("/articles/:id", function(req, res) {
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
      //************Test to see if its one note or all?************
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



