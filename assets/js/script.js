//movie poster result list
var movieContainerEl = document.querySelector("#movies-container");

//movie search input
var movieInputEl= document.querySelector("#movie-search");

var movieSearchTerm = document.querySelector("movie-search-term");

var searchFormEl = document.querySelector("search-form");

var displayMovies = function(movies, searchTerm){
    //if no such movie
    if(movies.length ===0){
        movieContainerEl.textContent = "You Must Be Have a Unique Movie State Because No Such Movie Found!";
        return;
    }

    //re-initialize search content
    movieContainerEl.textContent = "";
    movieSearchTerm.textContent = searchTerm;

    for (var i=0; i<movies.length; i++){
        //format name
        var movieName = movies[i].owner.login + "/" + movies[i].name; //each movie

        //create link for each movie
        var movieEl = document.createElement("a");
        movieEl.classList = "list-item flex-row justify-space-between align-center";
        movieEl.setAttribute("href", "./single-movie.html?movie=" + movieName); //link every container to single-movie page

        //create span element to hold movie name
        var titleEl = document.createElement("span");
        titleEl.textContent = movieName; //span text content is the formatted movie name

        //append to container
        movieEl.appendChild(titleEl); //put the span element with movie name in div container

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current movie has issues or not
        if (movies[i].open_issues_count > 0){ //if there are movie issues
            statusEl.innerHTML=
            "<i class='fas fa-times status-icon icon-danger'></i>" + movies[i].open_issues_count + "issue(s)";
        } else {
            statusEl.innerHTML="<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append status to div container
        movieEl.appendChild(statusEl);

        //append div container to the movie list
        movieContainerEl.appendChild(movieEl); //put div container at the end of list of searches
    }

}


var getMovies = function (movie){
    var apiUrl = "http://www.omdbapi.com/?&t=" + movie+ "&apikey=c952743e";

    fetch(apiUrl).then(function(response){
        //if success
        if (response.ok){
            response.json().then(function(data){
                displayMovies (data, movie);
            });
        } else{
            alert("You Must Be Have a Unique Movie State Because No Such Movie Found!");
        }
    })
    .catch(function(error){
        alert("No Internet :(");
    });
};

var formSubmitHandler = function(event){
    event.preventDefault();
    //get value from input element
    var movie = movieInputEl.value.trim();

    if (movie) {
        getMovies(movie);
        movieInputEl.value = ""; //reset value of username input in search bar
    } else {
        alert("Don't be shy, enter a movie name");
     }
};

searchFormEl.addEventListener("submit", formSubmitHandler); //when submit is clicked on whole form, have formSubmitHandler go off
