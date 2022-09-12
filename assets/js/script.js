// Pseudocode
// need:
//  
//      city name, date(moment.js format (mm/dd/yyyy)), day/night; icon representing weather;
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
// const pentIcon = $(".f-icon");
// const pentTemp = $(".f-temp");
// const pentWind = $(".f-wind");
// const pentHumid = $(".f-humid");
const displayHistory = $("#city-name");

const currentDate = moment().format("MM/DD/YYYY");
// const fDate = $(".f-date");

let cityList = [];

// FETCH API
searchBtn.on("click", function(query){

    // Define user input for desired city
        let cityInput = $("#city-input").val().trim();
        console.log(cityInput);

    
    // Local Storage
        cityList.push(cityInput);
        localStorage.setItem("cityList", JSON.stringify(cityList));
        console.log(localStorage);

    // api url to get lat + lon for desired city
        let geocoderURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityInput + '&appid=d2cb5b734a2fa9d859a2d482475acef1'

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

                // console.log(data.current.weather[0].main);
                console.log(data.current);
                    let weatherIcon = data.current.weather[0].icon;
                    var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + ".png";                
                    let forecastData = []
                    let forecast = data.daily;
                    forecastData.push(forecast);
                    console.log(forecast);
                
                // set current weather conditions
                    cTemp.text("Temp: " + data.current.temp + " °F");
                    cWind.text("Wind Speed: " + data.current.wind_speed + " mph");
                    cHumidity.text("Humidity: " + data.current.humidity + "%");
                    cUVI.text("UV Index: " + data.current.uvi);
                    $("#c-icon").html("<img src=" + iconURL + ">");
                
                // set forecast dates
                    let startDate = moment();
                    let forecastArr = [];
                    
                    for(let i=0; i<5; i++){
                    forecastDates = startDate.add( + 1, 'days').format("MM/DD/YYYY");
                    forecastArr.push(forecastDates);
                    $("#day1").text(forecastArr[0]);
                    $("#day2").text(forecastArr[1]);
                    $("#day3").text(forecastArr[2]);
                    $("#day4").text(forecastArr[3]);
                    $("#day5").text(forecastArr[4]);
                    }                


                
                // if(weatherIcon === "Clear"){
                //     console.log("hi");
                //     // cIcon.child.addClass("fa-sun");
                //     document.getElementById("c-icon").childNodes[0].className += " fa-sun";
                //     cIcon
                // } else if(weatherIcon === "Drizzle") {
                //     cIcon.addClass("fa-cloud-drizzle");
                // } else if(weatherIcon === "Rain") {
                //     // console.log("rain, rain");
                //     cIcon.addClass("fa-cloud-showers-heavy");
                // } else if(weatherIcon === "Thunderstorm") {
                //     cIcon.addClass("fa-cloud-bolt");
                // } else if(weatherIcon === "Clouds") {
                //     cIcon.addClass("fa-cloud");
                // } else if(weatherIcon === "Snow") {
                //     cIcon.addClass("fa-cloud-snow");
                // } else if(weatherIcon === "Atmosphere") {
                //     cIcon.addClass("fa-smoke");
                // };

                    if (data.current.uvi < "3" || data.current.uvi === "0") {
                        cUVI.addClass("favorable");
                    } else if (data.current.uvi > "5") {
                        cUVI.addClass("severe");
                    } else {
                        cUVI.addClass("moderate");
                    }

                // Populate 5-Day Forecast
                    for(var i=0; i < 5; i++) {

                // Define Data for forecast
                    let fTemps = forecast[i].temp.day;
                    let fWind = forecast[i].wind_speed;
                    let fHumidity = forecast[i].humidity;

                    console.log(fTemps);
                    console.log(fWind);
                    console.log(fHumidity);

                    // let startDate = moment();
                    // let incDays = startDate.add(i + 1, 'days').format("MM/DD/YYYY");
                    // var obj = {date: incDays}
                    // let pentDates = [];
                    // console.log(incDays);
                    // pentDates.push(obj);
                    // console.log(pentDates);
                    
                    // fDate.text(incDays);
                    // pentTemp.text("Temp: " + fTemps);
                    // pentWind.text("Wind: " + fWind + " mph");
                    // pentHumid.text("Humidity: " + fHumidity + "%");

                    // if(fIcon === "clear"){
                    //     pentIcon.addClass("fa-sun");
                    // } else if(fIcon === "drizzle") {
                    //     pentIcon.addClass("fa-cloud-drizzle");
                    // } else if(fIcon === "rain") {
                    //     pentIcon.addClass("fa-cloud-showers-heavy");
                    // } else if(fIcon === "thunderstorm") {
                    //     pentIcon.addClass("fa-cloud-bolt");
                    // } else if(fIcon === "Clouds") {
                    //     pentIcon.addClass("fa-cloud");
                    // } else if(fIcon === "snow") {
                    //     pentIcon.addClass("fa-cloud-snow");
                    // } else if(fIcon === "atmosphere") {
                    //     pentIcon.addClass("fa-smoke");
                    // };
                
                    }

                });

            })

        cityInput.val("");
})

// RENDER LOCAL STORAGE
function renderLocalStorage() {

    let searchHistory = JSON.parse(localStorage.getItem("cityList"));
    console.log(searchHistory);

    if(!cityList) {

    }
    
    // searchHistory.forEach(displayHistory => {

    // });
    // for(let i=0; i < searchHistory.length; i++) {
    //     const searches = document.createElement("li");
    //     searches.textContent = searchHistory[0];
    //     displayHistory.appendChild(searches).addClass("sh my-2");
    // }

}

const clearBtn = $("#clear-btn");

clearBtn.on("click", function(event){
    localStorage.clear()
    .then(console.log("Memory Wipe"))
});