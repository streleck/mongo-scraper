// Requiring our Note and Article models
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

module.exports = function(app){
	
	app.get("/", function(req, res) {
	  res.sendFile("index.html");
	});

	app.get("/articles", function(req, res) {
  // Grab every doc in the Articles array
	  Article.find({}).sort({"date":1}).exec(function(error, doc) {
	    // Log any errors
	    if (error) {
	      console.log(error);
	    }
	    else {
	      res.send(doc);
	    }
	  });
	});

	app.get("/notes/:noteId", function(req, res) {
		 
		Article.find({"_id":req.params.noteId}).populate('notes', 'author body').exec(function(error, doc) {
	    // Log any errors
	    if (error) {
	      console.log(error);
	    }
	    else {
	      res.send(doc);
	    }
	  });
	});

	app.get("/cleardb", function(req, res) {
		 
		Article.remove({}).exec(function(error,doc) {
	    // Log any errors
	    if (error) {
	      console.log(error);
	    }
	    else {
	    	Note.remove({}).exec(function(error,doc) {
			    // Log any errors
			    if (error) {
			      console.log(error);
			    }
			    else {
			    	res.send("db cleared");
			    }
			  });
	    }
	  });
	});
};