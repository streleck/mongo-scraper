var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/Article.js");


module.exports = function(app) {  
  
  //scrape all articles from the stranger
  app.get("/scrape", function(req, res) {
    var scrapeResults = [];
    request("http://www.thestranger.com", function(error, response, html) {

      var $ = cheerio.load(html);

      $("h2.headline").each(function(i, element) {
        
  		  var link = $(element).find("a").attr("href");
        var title = $(element).find("a").text().trim();
        
        if (title.length > 0){
          if (!((link.startsWith("https://www.thestranger.com/")) || (link.startsWith("http://www.thestranger.com/")) || (link.startsWith("https://post.thestranger.com")))){
            link = "http://www.thestranger.com/" + link;
          }

    		  result = {
    		  	"link": link,
            "title": title,
    		  };
        //save
          var entry = new Article(result);
          entry.save(function(err, doc) {
          });
        }
      });
    });
    res.send("articles scraped");
  });
};