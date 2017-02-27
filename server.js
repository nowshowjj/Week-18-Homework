var cheerio = require('cheerio');
var request = require('request');

//putting the results in a array
var result = [];
var count = 0 ;




getPosts('https://www.reddit.com/r/webdev/');

function getPosts(url) {
  count++;
  request(url, function(err, resp, body){
    // this passes all of the html to the $.
    var $ = cheerio.load(body);
    // from here we can look for specific things

    //for example we are looking for the <p class="title"> and getting the link of the article
    $('p.title').each(function(idx, element){
      var title = $(this).text();
      var link = $(this).children().attr("href");

    // pushing to reults variable
      result.push({
        title:title,
        link:link
      })
    });
    // this is the link for the next button that reveals more results
    var next = $('span.next-button a').attr('href')
    
    // making count go up so it doesnt infinetly give us all the pages from tge begining.
    if (count === 3) {
      console.log(result);
    } else {
      getPosts(next);
    }
  });

}




