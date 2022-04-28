var movieListEl= document.getElementById("movie-list")
var apiUrl= "http://www.omdbapi.com/?&s=Harry+Potter&apikey=c952743e"
fetch (apiUrl) 
.then(function(response){
    return response.json();
})
.then(function(data){
    console.dir(data)
    var movieResults= data.Search
    console.log(movieResults)

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
        console.log(moviePosterEl)
        console.log(movieListEl)
    
    }
})
