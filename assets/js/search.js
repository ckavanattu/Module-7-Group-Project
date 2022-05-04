// GOOGLE API KEY: AIzaSyDq-lhhsuRY-VdsmpWyFOz9agUMqOaTR7A
var moviePosterEl = document.getElementById("imdbPoster");
var movieTitleEl = document.getElementById("imdbTitle");
var movieInfoEl = document.getElementById("movieInfo");
var moviePlotEl = document.getElementById("moviePlot");
var imdbLinkEl = document.getElementById("imdbLink");
var wikiLinkEl = document.getElementById("wikiLink")
var movieRatingEl = document.getElementById("movieRating")
var watchNowEl = document.getElementById("watchNow")
var movieReviewEl = document.getElementById("movieReviews")

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
    var reviews = data.Ratings
    console.dir(reviews)

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
    movieInfoEl.appendChild(movieRating)
    movieInfoEl.appendChild(movieGenre)
    movieInfoEl.appendChild(movieRelease)

    // create link to IMDB page
    imdbLinkEl.setAttribute("href", "https://www.imdb.com/title/" +movieId )

    movieReviews(reviews);

}

omdbSearch(movieId);

var movieReviews = function(review){

for (i=0; i<review.length; i++) {
    var reviewSource = review[i].Source
    var reviewValue = review[i].Value
    console.log(reviewSource)
    console.log(reviewValue)

    var reviewSourceEl=  document.createElement("h5")
    reviewSourceEl.innerText = reviewSource

    var reviewValueEl = document.createElement("p")
    reviewValueEl.innerText = reviewValue 

    movieRatingEl.appendChild(reviewSourceEl)
    movieRatingEl.appendChild(reviewValueEl)
}

var streamApi = function(movieId) {
    
    
    var apiUrlThree =  "https://api.themoviedb.org/3/movie/" +movieId+ "/watch/providers?api_key=3fa1f09b9409b474da0058e7029fa615&language=en-US"


    fetch(apiUrlThree)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var usStream = data.results.US.link
        console.dir(usStream)
        watchNowEl.setAttribute("href", usStream)
        
    }) 
}

var movieReview = function(){
    var apiUrlFour = "https://api.themoviedb.org/3/movie/" +movieId+ "/reviews?api_key=3fa1f09b9409b474da0058e7029fa615&language=en-US"

    fetch(apiUrlFour)
    .then(function(response){
        return response.json();        
    })
    .then(function(data){
        console.dir(data.results)

        var reviewResults = data.results

        for (i=0; i<reviewResults.length; i++) {
            var reviewAuthor = reviewResults[i].author
            var reviewLink = reviewResults[i].url

            var reviewLinkEl= document.createElement("a")
            reviewLinkEl.setAttribute("href", reviewLink)
            reviewLinkEl.innerHTML = "Review By: " +reviewAuthor

            movieReviewEl.appendChild(reviewLinkEl)
        }
    })
}

streamApi(movieId);
movieReview(movieId);

}
