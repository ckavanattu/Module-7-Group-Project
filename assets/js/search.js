var moviePosterEl = document.getElementById("imdbPoster");
var movieTitleEl = document.getElementById("imdbTitle");
var movieRatingEl = document.getElementById("movieRating");
var moviePlotEl = document.getElementById("moviePlot");
var imdbLinkEl = document.getElementById("imdbLink");
var wikiLinkEl = document.getElementById("wikiLink")



var movieId = document.location.search.split("=")[1];
console.log(movieId)



var omdbSearch = function(movieId) {

var apiUrl = "https://www.omdbapi.com/?i=" +movieId+ "&plot=full&apikey=c952743e"

fetch(apiUrl)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.dir(data)
    movieSearch(data);
})

}

//function to generate page layout
var movieSearch = function(data) {
    var poster = data.Poster 
    var plot = data.Plot
    var title= data.Title
    var rating = data.Rated
    var genre= data.Genre
    var release = data.Released
    console.log(poster, plot, title, rating)

    //variable to generate poster image
    var posterImage = document.createElement("img");
    posterImage.setAttribute("src", poster);
    moviePosterEl.appendChild(posterImage)
    
    //variable to input movie plot into HTML
    moviePlotEl.innerText= plot
    
    // input movie Title
    movieTitleEl.innerText=title

    // movie Ratings List
    var movieRating = document.createElement("li")
    movieRating.innerText= "Rated: " + rating

    // movie genre list
    var movieGenre = document.createElement("li")
    movieGenre.innerText = "Genre: " + genre

    //movie release date
    var movieRelease =document.createElement("li")
    movieRelease.innerText = "Released: " + release
    
    //append everything
    movieRatingEl.appendChild(movieRating)
    movieRatingEl.appendChild(movieGenre)
    movieRatingEl.appendChild(movieRelease)

    // create link to IMDB page
    imdbLinkEl.setAttribute("href", "https://www.imdb.com/title/" +movieId )



    googleApi(title);

}

omdbSearch(movieId);


var googleApi = function(movieTitle) {

var apiUrlTwo = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDq-lhhsuRY-VdsmpWyFOz9agUMqOaTR7A&cx=7d2740d85140c5cf1&q=movie" + movieTitle 

fetch(apiUrlTwo)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var wikiLink = data.items[0].link
        console.log(wikiLink)

        wikiLinkEl.setAttribute("href", "https://www.rottentomatoes.com/m/" + movieTitle)
    })

}
