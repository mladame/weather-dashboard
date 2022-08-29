// Pseudocode
// need:
//   search for city
//      call geolocator api, then call weather api
//      onclick search button, fetch api, json(), display results
//   display city weather api
//      city, date, day/night; icons; temp, wind, humidity, uv index(color coded); 5-day forecast
//      uv index: green = favorable; yellow = moderate; red = severe
//   list local storage - search history
//      previously searched cities remain on list despite refresh, display upon page open
//      weather info clears upon refresh
//      can click on cities and get info, will overwrite what is being shown