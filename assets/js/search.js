var moviePosterEl = document.getElementById("imdbPoster");
var movieTitleEl = document.getElementById("imdbTitle");
var movieInfoEl = document.getElementById("movieInfo");
var moviePlotEl = document.getElementById("moviePlot");
var imdbLinkEl = document.getElementById("imdbLink");
var wikiLinkEl = document.getElementById("wikiLink")
var watchNowEl = document.getElementById("watchNow")
var castList = document.getElementById("cast-list")
var trailerEl = document.getElementById("trailer")
var watchNowErrorEl = document.getElementById("stream-error")

var movieId = document.location.search.split("=")[1];




var omdbSearch = function(movieId) {

var apiUrl = "https://www.omdbapi.com/?i=" +movieId+ "&plot=full&apikey=c952743e"

fetch(apiUrl)
.then(function(response){
    return response.json();
})
.then(function(data){
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
    imdbLinkEl.setAttribute("target", "_blank")

    }

omdbSearch(movieId);


var streamApi = function(movieId) {
    
    
    var apiUrlThree =  "https://api.themoviedb.org/3/movie/" +movieId+ "/watch/providers?api_key=3fa1f09b9409b474da0058e7029fa615&language=en-US"


    fetch(apiUrlThree)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var usStream = data.results.US.link
        watchNowEl.setAttribute("href", usStream)
        watchNowEl.setAttribute("target", "_blank")
        
    }) 
    .catch(function(error){
        watchNowEl.addEventListener("click", streamError)

    
    })
}

var streamError = function(event){
    watchNowErrorEl.innerText= "No Streaming Services Found"
}


var movieCast = function(movieId) {
    var apiUrlFive ="https://api.themoviedb.org/3/movie/" +movieId+ "/credits?api_key=3fa1f09b9409b474da0058e7029fa615&language=en-US"

    fetch(apiUrlFive)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        
        for (i=0; i<6; i++){
            var castActor = data.cast[i].name
            var castCharactor = data.cast[i].character
            
            var castInfoEl = document.createElement("h5")
            castInfoEl.innerText = castActor + " as " + castCharactor

            castList.appendChild(castInfoEl)
            
        }
    })
    .catch(function(error){
        var castError = document.createElement("h5")
        castError.innerHTML= "Cast Information Not Found"
        castList.appendChild(castError)
    })
}

var videoApi = function(movieId) {
    
    
    var apiUrlThree =  "https://api.themoviedb.org/3/movie/" +movieId+ "/videos?api_key=3fa1f09b9409b474da0058e7029fa615&language=en-US"


    fetch(apiUrlThree)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.dir(data)
        var videos = data.results
        
        for(i=0; i<1; i++) {
            console.dir(videos)
            
            var trailer = videos[i].type
            console.dir(trailer)

            if (trailer="Trailer"){
                var videoContainer=document.createElement("div");
                var videoPlayer = document.createElement("iframe")
                var videoKey = videos[i].key
                console.log(videoKey)
                videoPlayer.setAttribute("src", "https://www.youtube.com/embed/" +videoKey)
                videoPlayer.setAttribute("height", "315")
                videoPlayer.setAttribute("width", "420")
                videoContainer.appendChild(videoPlayer);
                trailerEl.appendChild(videoContainer)
            }
        }    
    }) 
    .catch(function(error){
        var videoError = document.createElement("h5")
        videoError.innerHTML= "No Trailer Found"
        trailerEl.appendChild(videoError)
    })
    
}

streamApi(movieId);
movieCast(movieId);
videoApi(movieId);
