// Pseudocode
// need:
//   search for city
//      call geolocator api
//          
//       then call weather api
//      onclick search button, fetch api, json(), display results
//      createEl
//      geolocator api call: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//      one call api call: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//   display city weather api
//      city name, date(moment.js format (mm/dd/yyyy)), day/night; icon representing weather;
//       temp, wind, humidity, uv index(color coded); 
//        5-day forecast
//      uv index: green = favorable; yellow = moderate; red = severe
//   list local storage - search history
//      previously searched cities remain on list despite refresh, display upon page open
//      weather info clears upon refresh
//      can click on cities and get info, will overwrite what is being shown

// Start Code
// DEFINE ELEMENTS
const searchBtn = $("#search-btn");
const cityInput = $("#city-input");


// FETCH API
searchBtn.on("click", function(event){
    event.preventDefault();
    
    var geocoderURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=5&appid=d2cb5b734a2fa9d859a2d482475acef1"

    console.log(geocoderURL);

    // fetch api for geocoder, user inputs desired City, geocoder returns corresponding lat + lon
    fetch(geocoderURL)
        .then(response => response.json())
        .then(data => console.log(data));
        
        

    var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=97b3a3279f4bc24383eff898e8ad790c"

    // fetch weather api, input lat + lon for desired City, return weather report
    // fetch(weatherURL)
        // .then(response => response.json())
        // .then(data => console.log(data));

})

// RENDER WEATHER
