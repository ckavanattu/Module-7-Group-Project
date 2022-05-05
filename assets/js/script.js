var movieListEl = document.getElementById("movie-list")
var movieFormEl = document.getElementById("searchName")
var searchFormEl = document.getElementById("searchForm")
var searchResultsEl = document.getElementById("searchResults")
var searchError= document.getElementById("error")

var movieSearch = function (event) {
    event.preventDefault();
    var movie = movieFormEl.value.trim();

    
    if (movie) {
        searchResults(movie);
        searchError.innerText=" "
        movieFormEl.value = " "

    }
    else {
        searchError.innerText="Please Enter A Movie Name"
    }
}

searchFormEl.addEventListener("submit", movieSearch);



var searchResults = function (movie) {
    var apiUrl = "https://www.omdbapi.com/?&s=" + movie + "&type=movie&apikey=c952743e"
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.dir(data)
            var movieResults = data.Search

            displayMovies(movieResults, movie);

        })
}

var displayMovies = function (movieResults, movie) {

    movieListEl.textContent = (" ")


    console.dir(movieResults)

    if (!movieResults){
        searchError.innerText ="No Results Found For " +movie   
    }

    else{

        searchError.innerText = "Showing Results For "+movie

        for (i = 0; i < movieResults.length; i++) {

            var moviePicture = movieResults[i].Poster
            

            if (moviePicture != "N/A"){

                var movieTitle = movieResults[i].Title
                var movieId = movieResults[i].imdbID
                
                // create a link to contain the movie poster
                var movieBox = document.createElement("a")
                movieBox.setAttribute("href", "./search.html?title=" + movieId)
                movieBox.classList = ("col-md-3 pt-2")
                movieBox.setAttribute("id", "moviePoster")

                //movie Poster holding the image and title
                var moviePoster = document.createElement("div")
                moviePoster.classList = ("well text-center poster-div")
                //movie image
                var movieImage = document.createElement("img");
                movieImage.setAttribute("src", moviePicture);
                //movie title
                var posterTitle = document.createElement("h5")
                posterTitle.innerText = movieTitle


                moviePoster.appendChild(movieImage)
                moviePoster.appendChild(posterTitle)
                movieBox.appendChild(moviePoster)
                movieListEl.appendChild(movieBox)
            }
        }
    }

}



  

 