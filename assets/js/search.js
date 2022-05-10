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
        //check if user selected upcoming movie, which has a different movie id so we need to convert it to imdb id
         if (typeof data.Title !== 'undefined'){
            movieSearch(data);
        } else{
            upcomingMovie(movieId);
        }
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


//WATCH BUTTONS
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
    event.preventDefault();
    watchNowErrorEl.textContent("No streaming service found!");
}

//CAST INFO
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
            
            var castInfoEl = document.createElement("h6")
            castInfoEl.innerText = castActor + " as " + castCharactor

            castList.appendChild(castInfoEl)
            
        }
    })
    .catch(function(){
        var castEl = document.getElementById("movieCast");
        castEl.innerHTML = "";
    })
}

//TRAILER
var videoApi = function(movieId) {
    
    
    var apiUrlThree =  "https://api.themoviedb.org/3/movie/" +movieId+ "/videos?api_key=3fa1f09b9409b474da0058e7029fa615&language=en-US"


    fetch(apiUrlThree)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        //console.dir(data)
        var videos = data.results
        
        for(i=0; i<1; i++) {
           // console.dir(videos)
            
            var trailer = videos[i].type
            //console.dir(trailer)

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
        var videoTitle = document.getElementById("trailerTitle");
        videoTitle.innerHTML= "";
    })
    
}

streamApi(movieId);
movieCast(movieId);
videoApi(movieId);

//IF UPCOMING MOVIE WAS SELECTED
var upcomingMovie = function(dbmovieId){
    var apiUrlSeven = "https://api.themoviedb.org/3/movie/" + dbmovieId + "?api_key=3fa1f09b9409b474da0058e7029fa615&language=en-US";

    fetch(apiUrlSeven)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var movieId = data.imdb_id;
        omdbSearch(movieId);
    })
}


//////////// -------- upcoming movie section ---------   //////////////

//GET UPCOMING MOVIES 
var getUpcomingMovies = function() {
    var apiUrlSix = "https://api.themoviedb.org/3/movie/upcoming?api_key=3fa1f09b9409b474da0058e7029fa615&language=en-US&page=1"
    
    fetch(apiUrlSix)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
         //console.dir(data);
         var upcomingMovieArray = data.results
         displayUpcomingMovies(upcomingMovieArray);

    })
    
}

//DISPLAY UPCOMING MOVIES BELOW SEARCH
var displayUpcomingMovies = function (movieArray) {

        for (i = 0; i < movieArray.length; i++) {

            var upcomingPicture = movieArray[i].poster_path;
            var upcomingMovieId = movieArray[i].id;

            if (upcomingPicture != "N/A"){

                var upcomingTitle = document.getElementById("upcomingTitle");
                upcomingTitle.innerHTML = "Upcoming Movies You'd Love"

                var movieTitle = document.createElement("h4");
                movieTitle.append(movieArray[i].title); //<h4> "data.title" </h4>

                var moviePoster = document.createElement("img");
                moviePoster.setAttribute("src", "https://image.tmdb.org/t/p/w342"+upcomingPicture); // <img src="poster_path">

                var movieCard = document.createElement("a");
                movieCard.setAttribute("href", "./search.html?title=" + upcomingMovieId)
                movieCard.classList = ("well text-center movie-card")
                movieCard.append(movieTitle);
                movieCard.append(moviePoster);

                var upcomingEl = document.getElementById("upcomingList");
                upcomingEl.append(movieCard);
            }


        }
    }

getUpcomingMovies();
