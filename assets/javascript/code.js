var topics = ["Star Wars Robot Chicken","Adventure Time","The Venture Bros.","Aqua Teen Hunger Force","Robot Chicken","Rick and Morty","Archer","South Park","Futurama","The Simpsons"];

var searchNum = "10";


// sets function to Display GIFS when selected cartoon button is clicked
function displayGIF() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=nNwVFgDI7U8D8nqDSI36ttSSNYfSGzs3&limit="+searchNum;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++){
            var cartoonDiv = $("<div class='gif-box border border-info bg-warning p-1 m-1 d-block float-left'>");
            var ratingElement = $("<p>").text('Rating: '+results[i].rating);
            var cartoonGIF = $("<img>")
                .addClass("gif")
                .attr("src", results[i].images.fixed_width_still.url)
                .attr("data-still", results[i].images.fixed_width_still.url)
                .attr("data-animate", results[i].images.fixed_width.url);
            cartoonDiv.append(cartoonGIF, ratingElement);
            $("#gifZone").prepend(cartoonDiv);
        }
    });
}

// Activates/Deactivates selected GIF on click
$(document).on("click", ".gif", function(){
    var clickedElement = $(this);
    var state = clickedElement.attr("data-state");
    var clickedElement = $(this);
    var state = clickedElement.attr("data-state");
    if(state === 'still') {
        var animateSrc = clickedElement.attr("data-animate");
        clickedElement.attr("src", animateSrc);
        clickedElement.attr("data-state", "animate");
    } else {
        var stillSrc = clickedElement.attr("data-still");
        clickedElement.attr("src", stillSrc);
        clickedElement.attr("data-state", "still");
    }
});

// Change the number of GIFs to load on screen
$("#change-number").on("click", function(event){
    event.preventDefault();
    searchNum = $("#gif-num").val();
    $("form").trigger("reset");
});

// Load the cartoon buttons
function renderButtons() {
    $("#buttonZone").empty();
    for(var i=0; i<topics.length; i++) {
        var b = $("<button>");
        b.addClass("cartoon m-1");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#buttonZone").append(b);
    }
    $("form").trigger("reset");
}

// let the user add a cartoon to the button array
$("#add-cartoon").on("click", function(event){
    event.preventDefault();
    var cartoon = $("#user-toon").val().trim();
    topics.push(cartoon);
    renderButtons();
})

// on click runs the function to display gifs 
$(document).on("click", ".cartoon", displayGIF);

renderButtons();