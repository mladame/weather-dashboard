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

const currentDate = moment().format("MM/DD/YYYY");


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
            cityDate.text("City: " + cityName + "  " + currentDate);

            // fetch weather api using values pulled from geocoder api call
            let weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + geoLat + '&lon=' + geoLon + '&exclude=minutely,hourly,alerts&units=imperial&appid=9b35244b1b7b8578e6c231fd7654c186'

            // fetch weather api, input lat + lon for desired City, return weather report
            fetch(weatherURL)
                .then(response => response.json())
            .then(data => {

                let weatherIcon = data.current.weather[0].main;
                cTemp.text("Temp: " + data.current.temp + " °F");
                cWind.text("Wind Speed: " + data.current.wind_speed + " mph");
                cHumidity.text("Humidity: " + data.current.humidity + " %");
                cUVI.text("UV Index: " + data.current.uvi);

                if(weatherIcon == "clear"){
                    console.log('clear');
                    // cIcon.innerHTML += `<p id="c-icon" class="cweather card-text"><i class="fa-duotone fa-sun"></i> ${cIcon}</p>`;
                    cIcon.addClass("fa-duotone fa-sun");
                } else if(weatherIcon == "drizzle") {
                    cIcon.addClass("fa-duotone fa-cloud-drizzle");
                    // cIcon.innerHTML += `<p id="c-icon" class="cweather card-text"><i class="fa-duotone fa-cloud-drizzle"></i> ${cIcon}</p>`;
                } else if(weatherIcon == "rain") {
                    cIcon.addClass("fa-duotone fa-cloud-showers-heavy");
                    // cIcon.innerHTML += `<p id="c-icon" class="cweather card-text"><i class="fa-duotone fa-cloud-showers-heavy"></i> ${cIcon}</p>`;
                } else if(weatherIcon == "thunderstorm") {
                    cIcon.addClass("fa-duotone fa-cloud-bolt");
                    // cIcon.innerHTML += `<p id="c-icon" class="cweather card-text"><i class="fa-duotone fa-cloud-bolt"></i> ${cIcon}</p>`;
                }
                else if(weatherIcon == "Clouds") {
                    cIcon.addClass("fa-duotone fa-cloud");
                    console.log("see there are clouds!")
                    // cIcon.innerHTML += `<p id="c-icon" class="cweather card-text"><i class="fa-duotone fa-cloud"></i> ${cIcon}</p>`;
                }
                else if(weatherIcon == "snow") {
                    cIcon.addClass("fa-duotone fa-cloud-snow");
                    // cIcon.innerHTML += `<p id="c-icon" class="cweather card-text"><i class="fa-duotone fa-cloud-snow"></i> ${cIcon}</p>`;
                }
                else if(weatherIcon == "atmosphere") {
                    cIcon.addClass("fa-duotone fa-smoke");
                    // cIcon.innerHTML += `<p id="c-icon" class="cweather card-text"><i class="fa-duotone fa-smoke"></i> ${cIcon}</p>`;
                }

                // console.log(data)
                // console.log(data.current.temp);
                console.log(weatherIcon);
                
            });

        })
        

})




// RENDER WEATHER
