// Pseudocode
// need:
//   search for city
//      call geolocator api, then call weather api
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