feature/initial-search
var movieListEl= document.getElementById("movie-list")
var apiUrl= "http://www.omdbapi.com/?&s=Harry+Potter&apikey=c952743e"
fetch (apiUrl) 
.then(function(response){
    return response.json();
})
.then(function(data){
    console.dir(data)
    var movieResults= data.Search
    // console.log(movieResults)
    
    
    for(i=0; i<movieResults.length; i++) {
        var moviePicture = movieResults[i].Poster
        console.log(moviePicture)
        var moviePosterList = document.createElement("div");
        moviePosterList.classList= ("col w=auto")
        var moviePosterEl = document.createElement("img");
        moviePosterEl.setAttribute ("src", moviePicture);
        // moviePosterEl.classList = ("max-width: 450px")
        moviePosterList.appendChild(moviePosterEl);
        movieListEl.appendChild(moviePosterList);
        // console.log(moviePosterEl)
        // console.log(movieListEl)       
        var movieName = movieResults[0].Title
    
    }

    var apiUrlTwo = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + movieName + "&api-key=zeYpOZOvVZhX3uxBJckkZIyWGVeFLuEy"

    fetch(apiUrlTwo)
    .then (function(response) {
        return response.json();
    })
    .then(function(data){
        // console.dir(data)
        var movieInfo = data.results
        console.dir(movieInfo)
        for (i=0; i<movieInfo.length; i++){
        var movieSummary= movieInfo[i].summary_short
        console.log(movieSummary)
        }

})

})

test-environment
