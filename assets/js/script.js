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
    // let cityName = $("city-name");

let geocodeData = [];


// FETCH API
searchBtn.on("click", function(query){

    // Define user input for desired city
    let cityInput = $("#city-input");
    // iterate over cityInput's keys, logs key names and respective values to console
    for(let key in cityInput) {
        // console.log(key + ":", cityInput[key].value);
    }

    // api url to get lat + lon for desired city
    let geocoderURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityInput[0].value + '&appid=d2cb5b734a2fa9d859a2d482475acef1'

    // fetch api for geocoder, user inputs desired City, geocoder returns corresponding lat + lon
    fetch(geocoderURL)
        .then((response) => response.json())
        .then((data) => console.log(data[0].lat));

        // check arr is receiving data
        // console.log(geocodeData, [0].lat);

        // loop through geocodeData, define lat and lon, put into weather api call
        // for(let i=0; i < data.length; i++) {
        //     if(data[0] === lat){
        //         console.log('lat');
        //     }
        // }

        // define lat and lon
        // let cityLat = $(geocodeData[0].lat);
        // let cityLon = $(geocodeData[0].lon);

        // console.log(cityLat);
        // console.log(cityLon);


    // let weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +  + '&lon=' +  + '&exclude=hourly,daily&appid=97b3a3279f4bc24383eff898e8ad790c'

    // fetch weather api, input lat + lon for desired City, return weather report
    // fetch(weatherURL)
        // .then(response => response.json())
        // .then(data => console.log(data));

})

// RENDER WEATHER
