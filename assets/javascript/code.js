var topics = ["Brock Sampson","Henchman 21","The Monarch","Sterling Archer","Pam Poovey","Cheryl Tunt","Bugs Bunny","Roger Rabbit","Stewie Griffin","Homer Simpson","Twilight Sparkle","Rainbow Dash","Pinkie Pie","Pinky and the Brain"];

var searchNum = "10";

function displayGIF() {
    var topic = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=nNwVFgDI7U8D8nqDSI36ttSSNYfSGzs3&limit="+searchNum;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        console.log(results);
        debugger;
        for (var i = 0; i < results.length; i++){
            var cartoonDiv = $("<div>");
            var ratingElement = $("<p>").text(results[i].rating);
            var cartoonGIF = $("<img>").attr("src", results[i].images.fixed_width_still.url)
                .attr("data-still", results[i].images.fixed_width_still.url)
                .attr("data-animate", results[i].images.fixed_width.url);
            cartoonDiv.append(ratingElement, cartoonGIF);
            $("#gifZone").prepend(cartoonDiv);
        }
    });
}

function renderButtons() {
    $("#buttonZone").empty();
    for(var i=0; i<topics.length; i++) {
        var b = $("<button>");
        b.addClass("cartoon");
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

$(document).on("click", ".cartoon", displayGIF);

renderButtons();