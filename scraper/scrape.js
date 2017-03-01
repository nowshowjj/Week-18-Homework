//Scraping requirements
var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/Article");

var site_to_scrape = "http://www.echojs.com/";



function site_scraper(callback){
    //Grabbing data from Echo.
      request(site_to_scrape, function(error, response, html) {
      
      var $ = cheerio.load(html);
      
      //Only grabbing the h2 and relative data
      $("article h2").each(function(i, element) {

        //Empty array for scrape
        var result = {};

        result.title = $(this).children("a").text().trim();
        result.link = $(this).children("a").attr("href");

        // Saving results to Article
     
        var entry = new Article(result);

        entry.save(function(err, doc) {
          if (err) {
            console.log("This Article Could not be saved: ",err);
          }
          else {
            console.log(doc);
          }
        });

      });
      callback();
    });
  
} //end of site_scraper





exports.site_scraper = site_scraper;