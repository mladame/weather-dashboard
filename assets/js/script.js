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
// const firstForecast = $("#forecast1");
// const secondForecast = $("#forecast2");
// const thirdForecast = $("#forecast3");
// const fourthForecast = $("#forecast4");
// const fifthForecast = $("#forecast5");
const forecastCards = $(".forecast");
const pentIcon = $(".f-icon");
const pentTemp = $(".f-temp");
const pentWind = $(".f-wind");
const pentHumid = $(".f-humid");
const fDate = $(".f-date");

const currentDate = moment().format("MM/DD/YYYY");
const forecastDates = $(".f-date");


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
            // Define lat and lon
            let geoLat = data[0].lat;
            let geoLon = data[0].lon;
            // Define + display city + current date
            const cityName = data[0].name;
            cityDate.text("City: " + cityName + "  " + currentDate);
            
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
                cHumidity.text("Humidity: " + data.current.humidity + " %");
                cUVI.text("UV Index: " + data.current.uvi);

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
                    // console.log("see there are clouds!")
                } else if(weatherIcon === "snow") {
                    cIcon.addClass("fa-cloud-snow");
                } else if(weatherIcon === "atmosphere") {
                    cIcon.addClass("fa-smoke");
                };
                
                // let fTemps =[], fWind = [], fHumidity = [], fIcon = [];
                
                // console.log(fHumidity);
                // console.log(fTemps);
                // console.log(fWind);
                // console.log(fIcon);

                // Populate 5-Day Forecast
                for(let i=0; i < 5; i++) {
                    // fTemps.push(forecast[i].temp.day);
                    // fWind.push(forecast[i].wind_speed);
                    // fHumidity.push(forecast[i].humidity);
                    // fIcon.push(forecast[i].weather[0].main);

                    let fTemps = forecast[i].temp.day;
                    let fWind = forecast[i].wind_speed;
                    let fHumidity = forecast[i].humidity;
                    let fIcon = forecast[i].weather[0].main;

                    console.log(fHumidity);
                    console.log(fTemps);
                    console.log(fWind);
                    console.log(fIcon);
                    
                    pentTemp.text("Temp: " + fTemps);

                }
                // array.forEach(element => {
                    
                // });
                firstForecast.append(fTemp[0]).addClass("card-text")
                .append(fWind[0]).addClass("card-text")
                .append(fHumidity[0]).addClass("card-text");

                // console.log(forecast[i].temp.day);
                    // console.log(forecast[i].wind_speed);
                    // // console.log(forecast[i].humidity);
                    // forecast1.append(forecast[0].temp.day).addClass("card-text")
                    // .append(forecast[0].wind_speed).addClass("card-text")
                    // .append(forecast[0].humidity).addClass("card-text");

                // firstForecast.append(data[0].temp.day)
                // $("h4").append()
                // forecast.forEach(forecastCards => {
                //     $("this").append(forecast[0].temp.day).addClass("class-text")
                //     .append(forecast[0].wind_speed).addClass("card-text")
                //     .append(forecast[0].humidity).addClass("card-text");
                // });

                console.log(forecast);
                // console.log(data.current.temp);
                // console.log(weatherIcon);
                
            });

        })
        

})




// RENDER WEATHER


// Local Storage