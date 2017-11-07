// Requiring our Note and Article models
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

module.exports = function(app){

	app.post("/savenote", function(req, res) {
  // Create a new note and pass the req.body to the entry
	  var newNote = new Note(req.body);

	  // And save the new note the db
	  newNote.save(function(error, doc) {
	    // Log any errors
	    if (error) {
	      console.log(error);
	    }
	    // Otherwise
	    else {
	      // Use the article id to find and update it's note
	      Article.findOneAndUpdate({ "_id": req.body.articleId }, {$push: { "notes": doc._id }})
	      // Execute the above query
	      .exec(function(err, doc) {
	        // Log any errors
	        if (err) {
	          console.log(err);
	        }
	        else {
	          // Or send the document to the browser
	          res.send(doc);
	        }
	      });
	    }
	  });
	});

	app.post("/deletenote", function(req, res) {

  	Note.remove({ "_id":req.body.id }).exec(function(error,doc) {

	    if (error) {
	      console.log(error);
	    }
	    else {
	    	res.send("note deleted");
	    }
	  });
	});

};
