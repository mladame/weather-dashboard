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
const cityDate = $("#city-date");
const cIcon = $("#c-icon");
const cTemp = $("#c-temp");
const cWind = $("#c-wind");
const cHumidity = $("#c-humidity");
const cUVI = $("#c-uvi");

    // let cityName = $("city-name");

// let geoKeys = ["lat", "lon"], geoValues = [];
// let obj = {};
// console.log(geoValues);


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
        .then((data) => {
            console.log(data[0]);
            // geoValues.push(data[0].lat, data[0].lon);
            let geoLat = data[0].lat;
            let geoLon = data[0].lon;
            const cityName = data[0].name;
            console.log(geoLat);
            console.log(geoLon);
            console.log(cityName);
            cityDate.text("City: " + cityName + "  MM/DD/YYY");

            // fetch weather api using values pulled from geocoder api call
            let weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + geoLat + '&lon=' + geoLon + '&exclude=minutely,hourly,alerts&units=imperial&appid=9b35244b1b7b8578e6c231fd7654c186'

            // fetch weather api, input lat + lon for desired City, return weather report
            fetch(weatherURL)
                .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data.current.temp);
                console.log(data.current.weather[0].main)
                cTemp.text("Temp: " + data.current.temp + " °F");
                cWind.text("Wind Speed: " + data.current.wind_speed + " mph");
                cHumidity.text("Humidity: " + data.current.humidity + " %");
                cUVI.text("UV Index: " + data.current.uvi);
                

            });

        })
        

})




// RENDER WEATHER
