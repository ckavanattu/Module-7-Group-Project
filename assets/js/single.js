//review container to put list of searches
var movieContainerEl = document.querySelector("#review-results");

var movieNameEl = document.querySelector("#search-term");

var getMovieName = function(){
    //grab movie name from query paramenter
    var queryString = document.location.search;
    var movieName = queryString.split("query=")[1];

    if (movieName){//if movie name works
        getMovieReviews(movieName); //put parameter in url
        movieNameEl.textContent = movieName; //put movie name in "Showing Results for"
    } else{//if not
        document.location.replace("./index.html"); //otherwise clockout and go home
    }
};


var getMovieReviews = function(movie){
    var apiUrl = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + movie + "&api-key=zeYpOZOvVZhX3uxBJckkZIyWGVeFLuEy";

    fetch(apiUrl).then(function(response) {
        //if requestion was successful
        if (response.ok){
            response.json().then(function(data){
                displayReviews(data);
            });
        } else {
            document.location.replace("./index.html");
        }
    });          
};

getMovieReviews;









//         .then(function(data){
//             var results = data.results
//             console.dir(data)
            
        
//             for (i=0; i<results.length; i++) {
//                 var movieTitle= results[i].display_title
        
//                 var movieListEl =document.createElement("li");
//                 movieListEl.textContent= movieTitle;
        
//                 movieEl.appendChild(movieListEl);
        
//                 console.log(results[i].display_title)
        
//             }
//             })
// }    
    