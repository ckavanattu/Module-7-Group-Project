  var apiUrlTwo = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDq-lhhsuRY-VdsmpWyFOz9agUMqOaTR7A&cx=7d2740d85140c5cf1&q=StarWars"

  alert("Test")

  fetch(apiUrlTwo)
  .then(function(response){
      return response.json();
  })
  .then(function(data){
      console.dir(data)
  })