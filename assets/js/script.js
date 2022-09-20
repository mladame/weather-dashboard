// Pseudocode
// need:
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
// const forecastCards = $(".forecast");
    const displayHistory = $("#city-name");
    const fIcon = $(".f-icon");
    const fData = $(".f-data");
    const fDate = $(".f-date");
    const fTemp = $(".f-temp");
    const fWind = $(".f-wind");
    const fHumidity = $(".f-humid");
    
    // console.log(cityInput);
    var cityList = [];
    const currentDate = moment().format("MM/DD/YYYY");    

// FETCH API
// searchBtn.on("click", getWeather) 
searchBtn.on("click", function(query) {

    // Define user input for desired city
        let cityInput = $("#city-input").val().trim();

    // api url to get lat + lon for desired city
        let geocoderURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityInput + '&appid=d2cb5b734a2fa9d859a2d482475acef1';

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

            // Set Local Storage
                cityList.push(cityInput);
                localStorage.setItem("cityList", JSON.stringify(cityList));
                console.log(localStorage);

            // fetch weather api using values pulled from geocoder api call
                let weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + geoLat + '&lon=' + geoLon + '&exclude=minutely,hourly,alerts&units=imperial&appid=9b35244b1b7b8578e6c231fd7654c186'

            // fetch weather api, input lat + lon for desired City, return weather report
                fetch(weatherURL)
                .then(response => response.json())
                .then(data => {

                // Define data
                    console.log(data);
                    let wIcon = data.current.weather[0].main;               
                    let forecastData = []
                    let forecast = data.daily;
                    forecastData.push(forecast);
                    console.log(wIcon);
                
                // set current weather conditions
                    cTemp.text("Temp: " + data.current.temp + " °F");
                    cWind.text("Wind Speed: " + data.current.wind_speed + " mph");
                    cHumidity.text("Humidity: " + data.current.humidity + "%");
                    cUVI.text("UV Index: " + data.current.uvi);
                
                // Sets Forecast dates
                    let startDate = moment();
                    let forecastDatesArr = [];
                    
                // Populates Dates of Forecast cards
                    for(let i=0; i<5; i++){
                    forecastDates = startDate.add( + 1, 'days').format("MM/DD/YYYY");
                    forecastDatesArr.push(forecastDates);
                    fDate[i].textContent = forecastDatesArr[i];
                    }                

                // Set UV Index indicator
                    if (data.current.uvi < "3" || data.current.uvi === "0") {
                        cUVI.addClass("favorable");
                    } else if (data.current.uvi > "5") {
                        cUVI.addClass("severe");
                    } else {
                        cUVI.addClass("moderate");
                    }

                // Adds class to icon html to render corresponding forecast - main display
                    if(wIcon === "Clear"){
                        cIcon.addClass("fa-sun");
                    } else if(wIcon === "Drizzle") {
                        cIcon.addClass("fa-cloud-drizzle");
                    } else if(wIcon === "Rain") {
                        cIcon.addClass("fa-cloud-showers-heavy");
                    } else if(wIcon === "Thunderstorm") {
                        cIcon.addClass("fa-cloud-bolt");
                    } else if(wIcon === "Clouds") {
                        console.log("cloudy skies")
                        cIcon.addClass("fa-cloud");
                    } else if(wIcon === "Snow") {
                        cIcon.addClass("fa-cloud-snow");
                    } else if(wIcon === "Atmosphere") {
                        cIcon.addClass("fa-smoke");
                    };

                    let forecastDaily = [];
                    forecastDaily.push(data.daily[0], data.daily[1], data.daily[2], data.daily[3], data.daily[4]);
                    console.log(forecastDaily);


                // Populate 5-Day Forecast
                    for(var i=0; i < 5; i++) {
                        console.log(forecast[i].temp.day);

                        fTemp[i].textContent = "Temp: " + forecastDaily[i].temp.day + "°F";
                        fWind[i].textContent = "Wind: " + forecastDaily[i].wind_speed + "mph";
                        fHumidity[i].textContent = "Humidity: " + forecastDaily[i].humidity + "%";
                        // let dailyW = data.daily[i].weather[0].main
                        // let fwIcon = [];
                        // fwIcon.push();
                        // console.log(dailyW);
                        // fwIcon.forEach(fIcon => {
                        //     if(fwIcon === "Clear"){
                        //     fIcon.addClass("fa-sun");
                        //     } else if(fwIcon === "Drizzle") {
                        //         fIcon.addClass("fa-cloud-drizzle");
                        //     } else if(fwIcon === "Rain") {
                        //         fIcon.addClass("fa-cloud-showers-heavy");
                        //     } else if(fwIcon === "Thunderstorm") {
                        //         fIcon.addClass("fa-cloud-bolt");
                        //     } else if(fwIcon === "Clouds") {
                        //         console.log("cloudy skies")
                        //         fIcon.addClass("fa-cloud");
                        //     } else if(fwIcon === "Snow") {
                        //         fIcon.addClass("fa-cloud-snow");
                        //     } else if(fwIcon === "Atmosphere") {
                        //         fIcon.addClass("fa-smoke");
                        //     };
                        // })
                        
                        
                        
                    // Define Data for forecast
                        // var fTemp = document.createElement("p");
                        // var fWind = document.createElement("p");
                        // var fHumidity = document.createElement("p");
                        // fTemp.text("Temp: " + forecast[i].temp.day);
                        // fWind.text("Wind: " + forecast[i].wind_speed + "mph");
                        // fHumidity.text("Humidity: " + forecast[i].humidity + "%");
                        // forecast1.appendChild(fTemp);
                        // forecast2.appendChild(fTemp);
                        // forecast3.appendChild(fTemp);
                        // forecast4.appendChild(fTemp);
                        // forecast5.appendChild(fTemp);

                        // let fTemps = forecast[i].temp.day;
                        // let fWind = forecast[i].wind_speed;
                        // let fHumidity = forecast[i].humidity;
                        // let fIcon = forecast[i].weather[0].icon
                        // var fIconURL = "http://openweathermap.org/img/wn/" + fIcon + ".png";

                    // forecast icons
                        // $("#icon0").html("<img src=" + fIconURL + ">");
                        // $("#icon1").html("<img src=" + fIconURL + ">");
                        // $("#icon2").html("<img src=" + fIconURL + ">");
                        // $("#icon3").html("<img src=" + fIconURL + ">");
                        // $("#icon4").html("<img src=" + fIconURL + ">");

                        // console.log(fTemp);
                        // console.log(fWind);
                        // console.log(fHumidity);

                        // pentTemp.text("Temp: " + fTemps);
                        // pentWind.text("Wind: " + fWind + " mph");
                        // pentHumid.text("Humidity: " + fHumidity + "%");

                    }

                });

            })

        let = cityInput.val("");
});

// alternate icon display KEEP --------------------------------
// var iconURL = "http://openweathermap.org/img/wn/" + wIcon + ".png"; 
// $("#c-icon").html("<img src=" + iconURL + ">");
// ------------------------------------------------------------

// RENDER LOCAL STORAGE
// function renderLocalStorage() {

//     // // set local storage
//     // cityList.push(cityInput);
//     // localStorage.setItem("cityList", JSON.stringify(cityList));
//     // console.log(localStorage);

//     // get + render local storage
//     let searchHistory = document.createElement("li");
//     searchHistory.textContent= JSON.parse(localStorage.getItem("cityList"));
//     // searchHistory.appendChild(searchHistoryText);
//     console.log(searchHistory);
//     const links = $("#city-name");
//     links.appendChild(searchHistory);
//     // links.

//     // links.value = 
    
//     // searchHistory.forEach(displayHistory => {

//     // });
//     // for(let i=0; i < searchHistory.length; i++) {
//     //     const searches = document.createElement("li");
//     //     searches.textContent = searchHistory[0];
//     //     displayHistory.appendChild(searches).addClass("sh my-2");
//     // }

// }
// renderLocalStorage()

// CLEAR LOCAL STORAGE
// const clearBtn = $("#clear-btn");
// clearBtn.on("click", function(event){
//     localStorage.clear()
// }); 

// fix for custom icons - future
                // if(wIcon === "Clear"){
                //     cIcon.child.addClass("fa-sun");
                // } else if(wIcon === "Drizzle") {
                //     cIcon.addClass("fa-cloud-drizzle");
                // } else if(wIcon === "Rain") {
                //     cIcon.addClass("fa-cloud-showers-heavy");
                // } else if(wIcon === "Thunderstorm") {
                //     cIcon.addClass("fa-cloud-bolt");
                // } else if(wIcon === "Clouds") {
                //     cIcon.addClass("fa-cloud");
                // } else if(wIcon === "Snow") {
                //     cIcon.addClass("fa-cloud-snow");
                // } else if(wIcon === "Atmosphere") {
                //     cIcon.addClass("fa-smoke");
                // };