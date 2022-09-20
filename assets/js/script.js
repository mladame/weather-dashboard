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
                    let fWeather = [];
                    // let fwIconArr = [];

                    for(var i=0; i<5; i++) {

                        forecastDaily.push(data.daily[i])
                        fWeather.push(forecastDaily[i].weather[0].main);
                        let fwIcon = fWeather[i];
                            if(fwIcon === "Clear"){
                                fWeather[i] = "fa-sun";
                            } else if(fwIcon === "Drizzle") {
                                fWeather[i] = "fa-cloud-drizzle";
                            } else if(fwIcon === "Rain") {
                                fWeather[i] = "fa-cloud-showers-heavy";
                            } else if(fwIcon === "Thunderstorm") {
                                fWeather[i] = "fa-cloud-bolt";
                            } else if(fwIcon === "Clouds") {
                                fWeather[i] = "fa-cloud";
                            } else if(fwIcon === "Snow") {
                                fWeather[i] = "fa-cloud-snow";
                            } else if(fwIcon === "Atmosphere") {
                                fWeather[i] = "fa-smoke";
                            };
                    }
                    console.log(forecastDaily);
                    console.log(fWeather);

                // Populate 5-Day Forecast
                    for(var i=0; i < 5; i++) {

                    // Set daily data to forecast cards
                        fTemp[i].textContent = "Temp: " + forecastDaily[i].temp.day + "°F";
                        fWind[i].textContent = "Wind: " + forecastDaily[i].wind_speed + "mph";
                        fHumidity[i].textContent = "Humidity: " + forecastDaily[i].humidity + "%";
                        $("#f-icon0").addClass(fWeather[0]);
                        $("#f-icon1").addClass(fWeather[1]);
                        $("#f-icon2").addClass(fWeather[2]);
                        $("#f-icon3").addClass(fWeather[3]);
                        $("#f-icon4").addClass(fWeather[4]);

                    // Set icons to forecast cards

                        // for(var i=0; i< forecastDaily.length; i++) {
                            
                        // }
                        
                        // let dailyW = data.daily[i].weather[0].main
                        
                        // fwIcon.push();
                        // console.log(dailyW);
                        // forecastDaily.forEach(fIcon => {

                            // let fwIcon = forecastDaily[i].weather[0].main;
                            // console.log(fwIcon);



                            // 
                        // })

                    }

                });

            })

        let = cityInput.val("");
});

// alternate icon display ---KEEP---------------------------------
// var iconURL = "http://openweathermap.org/img/wn/" + wIcon + ".png"; 
// $("#c-icon").html("<img src=" + iconURL + ">");
// ---------------------------------------------------------------

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
