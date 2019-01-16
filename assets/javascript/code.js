var topics = ["Brock Sampson","Henchman 21","The Monarch","Sterling Archer","Pam Poovey","Cheryl Tunt","Bugs Bunny","Roger Rabbit","Stewie Griffin","Homer Simpson","Twilight Sparkle","Rainbow Dash","Pinkie Pie","Pinky and the Brain"];

var searchNum = "10";

function displayGIF() {
    var topic = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=nNwVFgDI7U8D8nqDSI36ttSSNYfSGzs3&limit="+searchNum;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // var movieDiv = $("<div>")
        // var ratingElement = $("<p>").text(response.Rated);
        // var releaseDate = $("<p>").text(response.Released);
        // var moviePlot = $("<p>").text(response.Plot);
        // var moviePoster = $("<p>").html("<img src='"+response.Poster+"'>");
        // movieDiv.append(ratingElement, releaseDate, moviePlot, moviePoster);
        // $("#movies-view").prepend(movieDiv);
    });
}

function renderButtons() {
    $("#buttonZone").empty();
    for(var i=0; i<topics.length; i++) {
        var b = $("<button>");
        b.addClass("character");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#buttonZone").append(b);
    }
}

$("#add-cartoon").on("click", function(event){
    event.preventDefault();
    var cartoon = $("#user-toon").val().trim();
    topics.push(cartoon);
    renderButtons();
})

renderButtons();