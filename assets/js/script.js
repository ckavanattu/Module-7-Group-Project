var movieListEl= document.getElementById("movie-list")
var movieFormEl = document.getElementById("searchName")
var searchFormEl = document.getElementById("searchForm")


var movieSearch = function(event) {
    event.preventDefault();
    var movie = movieFormEl.value.trim();
    console.log(movie)

    if(movie){
        searchResults(movie);
        
    }
    else{
        alert("Issue");
    }
}

searchFormEl.addEventListener("submit", movieSearch);



var searchResults = function(movie) {
var apiUrl= "http://www.omdbapi.com/?&s=" +movie+ "&type=movie&apikey=c952743e"
fetch (apiUrl) 
.then(function(response){
    return response.json();
})
.then(function(data){
    console.dir(data)
    var movieResults= data.Search
           
    displayMovies(movieResults);
  
})
}

var displayMovies = function(movieResults) {

movieListEl.textContent = (" ")

for(i=0; i<movieResults.length; i++) {

     var moviePicture = movieResults[i].Poster
     var movieTitle = movieResults[i].Title
     var movieId = movieResults[i].imdbID
    console.log(movieTitle)

    // create a link to contain the movie poster
    var movieBox = document.createElement("a")
    movieBox.setAttribute("href", "./search.html?title=" +movieId)
    movieBox.classList = ("col-md-3")

    //movie Poster holding the image and title
    var moviePoster = document.createElement("div")
    moviePoster.classList=("well text-center")
    //movie image
    var movieImage = document.createElement("img");
    movieImage.setAttribute ("src", moviePicture);
    //movie title
    var posterTitle = document.createElement("h5")
    posterTitle.innerText = movieTitle
    
    moviePoster.appendChild(movieImage)
    moviePoster.appendChild(posterTitle)
    movieBox.appendChild(moviePoster)
    movieListEl.appendChild(movieBox)


}

}


// ISSUES TO WORK ON
// CHECK IF movieSearch COMES BACK WITH IMAGE
// CHECK WHY movieForm DOESNT WORK WHEN WE GO BACK FROM SECOND HTML



  

 