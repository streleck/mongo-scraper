//scrape and load articles
$(document).ready(function(){
	displayBoxes();
});

function displayBoxes(){
	$.get("/articles", function(data){
		console.log(data);
		for(var i=0;i<data.length;i++){

			var newsCard = "<div class='card' id='article" + i + "'>";
			newsCard += "<h2>" + data[i].title + "</h2>";
			newsCard += "<a target='_blank' href='" + data[i].link + "'><button>Full Article</button></a>";
			newsCard += "<button class='note-btn' data='article" + i + "' data-id='" + data[i]._id + "'>Notes</button>";
			newsCard += "<div class='note-field' id='article" + i + "-note-box'>";
			newsCard += "<h3>Notes:</h3>";
			newsCard += "<div id='article" + i + "-note-dump'></div>";
			newsCard += "<h4>Add Note:</h4>";
			newsCard += "<span>Name:<input type='text' id='article" + i + "-note-author'></span><br>";
			newsCard += "<textarea id='article" + i + "-note-text' rows='4' cols='50'></textarea>";
			newsCard += "<button class='note-submit' data='article" + i + "' data-id='" + data[i]._id + "'>Submit</button></div></div>"

			$("#article-dump").append(newsCard);

		};
	});
};

//button to reset/get new articles
$("#clearAll").on("click", function(){
	if (confirm("Are you sure you want to clear all old articles/notes?")){
		$.get("/cleardb", function(data){
			console.log(data);
			$.get("/scrape", function(data){
				console.log(data);
			}).then(function(good){
				displayBoxes();
				console.log("did it work?");
			}, function(bad){
				console.log("something bad");
			});
		});
	}
});

//button to open dropdown for note
$("#article-dump").on("click", ".note-btn", function(){
	var divId = "#" + $(this).attr("data") + "-note-box";
	if ($(divId).css("display") == "block"){
		$(divId).css("display","none");
		$("#" + $(this).attr("data") + "-note-dump").html("");
	}
	else{
		noteDisplay(this);
	}
});


//Make note:
$("#article-dump").on("click", ".note-submit", function(){
	//get field values
	var authorField = "#" + $(this).attr("data") + "-note-author";
	var author = $(authorField).val();
	var noteField = "#" + $(this).attr("data") + "-note-text";
	var noteText = $(noteField).val();
	//get article info
	var noteEntry = {
		author: author,
		body: noteText,
		articleId: $(this).attr("data-id")
	};
	//clear fields
	$(noteField).val("");
	$(authorField).val("");
	var thisBox = this;
	var currentURL = window.location.origin;
  $.post(currentURL + "/savenote", noteEntry,
    function(data){
  }).then(noteDisplay(thisBox));
});

//delete note:
$("#article-dump").on("click", ".note-delete", function(){
	var noteId = $(this).attr("data-id");
	$("#" + noteId).html("");
	$.post("/deletenote", {id: noteId}, function(data){
		console.log($(this).attr("data"))
		// noteDisplay($(this).attr("data"));
	});
});


function noteDisplay(article){
	console.log("article: " + article);
	$("#" + $(article).attr("data") + "-note-box").css("display","block");
	var articleId = $(article).attr("data-id");
	$.get("/notes/" + articleId, function(data){
		if (data.length>0){
			console.log(data);
			for(var i=0;i<data[0].notes.length;i++){
				$("#" + $(article).attr("data") + "-note-dump").append('<div id="' + data[0].notes[i]._id + '" class="individual-note"><p>"' + data[0].notes[i].body + '"</p><h5>Submitted by: ' + data[0].notes[i].author + '</h5><button class="note-delete" data="' + article + '" data-id="' + data[0].notes[i]._id + '">delete</button></div>');
			};
		};
	});
};
