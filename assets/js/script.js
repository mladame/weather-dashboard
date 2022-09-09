// Pseudocode
// need:
//  
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
const forecastCards = $(".forecast");
const pentIcon = $(".f-icon");
const pentTemp = $(".f-temp");
const pentWind = $(".f-wind");
const pentHumid = $(".f-humid");

const currentDate = moment().format("MM/DD/YYYY");
// const moment = require('moment');
const sum = moment().add(1, "d");
console.log(sum);
const fDate = $(".f-date");


// FETCH API
searchBtn.on("click", function(query){

    // Define user input for desired city
    let cityInput = $("#city-input");
    // iterate over cityInput's keys, logs key names and respective values to console
    for(let key in cityInput) {
        // console.log(key + ":", cityInput[key].value);
    }

    // Define value and key, set to local storage
    var city = $(this).siblings("#city-input").val();
    var name = $(this).parent().attr("id");
    localStorage.setItem(name, city);

    // create new element from local storage
    const searches = document.createElement("p");
    const memory = localstorage.getItem("city-name");

    // api url to get lat + lon for desired city
    let geocoderURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityInput[0].value + '&appid=d2cb5b734a2fa9d859a2d482475acef1'

    // fetch api for geocoder, user inputs desired City, geocoder returns corresponding lat + lon
    fetch(geocoderURL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0]);
            // Define lat and lon
            let geoLat = data[0].lat;
            let geoLon = data[0].lon;
            // Define + display city + current date
            const cityName = data[0].name;
            cityDate.text(cityName + "  " + currentDate);
            
            // fetch weather api using values pulled from geocoder api call
            let weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + geoLat + '&lon=' + geoLon + '&exclude=minutely,hourly,alerts&units=imperial&appid=9b35244b1b7b8578e6c231fd7654c186'

            // fetch weather api, input lat + lon for desired City, return weather report
            fetch(weatherURL)
                .then(response => response.json())
            .then(data => {

                let weatherIcon = data.current.weather[0].main;
                let forecast = data.daily;
                cTemp.text("Temp: " + data.current.temp + " °F");
                cWind.text("Wind Speed: " + data.current.wind_speed + " mph");
                cHumidity.text("Humidity: " + data.current.humidity + "%");
                cUVI.text("UV Index: " + data.current.uvi);

                console.log(weatherIcon);
                console.log(forecast);

                if (data.current.uvi < "3") {
                    cUVI.addClass("favorable");
                } else if (data.current.uvi > "5") {
                    cUVI.addClass("severe");
                } else {
                    cUVI.addClass("moderate");
                };
                
                if(weatherIcon === "clear"){
                    cIcon.addClass("fa-sun");
                } else if(weatherIcon === "drizzle") {
                    cIcon.addClass("fa-cloud-drizzle");
                } else if(weatherIcon === "rain") {
                    cIcon.addClass("fa-cloud-showers-heavy");
                } else if(weatherIcon === "thunderstorm") {
                    cIcon.addClass("fa-cloud-bolt");
                } else if(weatherIcon === "Clouds") {
                    cIcon.addClass("fa-cloud");
                } else if(weatherIcon === "snow") {
                    cIcon.addClass("fa-cloud-snow");
                } else if(weatherIcon === "atmosphere") {
                    cIcon.addClass("fa-smoke");
                };

                // Populate 5-Day Forecast
                for(let i=0; i < 5; i++) {

                    // Define Data for forecast
                    let fTemps = forecast[i].temp.day;
                    let fWind = forecast[i].wind_speed;
                    let fHumidity = forecast[i].humidity;
                    let fIcon = forecast[i].weather[0].main;
                    
                    // fDate.text(currentDate.moment().add(1, "d"));
                    pentTemp.text("Temp: " + fTemps);
                    pentWind.text("Wind: " + fWind + " mph");
                    pentHumid.text("Humidity: " + fHumidity + "%");

                    if(fIcon === "clear"){
                        pentIcon.addClass("fa-sun");
                    } else if(fIcon === "drizzle") {
                        pentIcon.addClass("fa-cloud-drizzle");
                    } else if(fIcon === "rain") {
                        pentIcon.addClass("fa-cloud-showers-heavy");
                    } else if(fIcon === "thunderstorm") {
                        pentIcon.addClass("fa-cloud-bolt");
                    } else if(fIcon === "Clouds") {
                        pentIcon.addClass("fa-cloud");
                    } else if(fIcon === "snow") {
                        pentIcon.addClass("fa-cloud-snow");
                    } else if(fIcon === "atmosphere") {
                        pentIcon.addClass("fa-smoke");
                    };
                
                }

            });

        })
        

        cityInput.val("");
})

// Local Storage