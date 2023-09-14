// API KEY = be9b75a065e73e1cac727dcc8207ba9e //

// selectors and variables //
const city = "cardiff";
const searchBarButton = document.querySelector("#search-bar-btn");
const SearchBarInput = document.querySelector("#search-bar-text");

// search bar functions //
searchBarButton.addEventListener("click", () => {
  if (SearchBarInput.value) {
    console.log(SearchBarInput.value);
  } else {
    console.log("please enter a city");
  }
});

// function that gets the lat + lon of a city and uses it as a parameter to get weather data //

async function getWeatherDataByCity(city) {
  const response = await fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=5&appid=be9b75a065e73e1cac727dcc8207ba9e"
  );

  response.json().then(function (response) {
    let lat = response[0].lat;
    let lon = response[0].lon;
    getWeatherData(lat, lon);
  });
}

// function that gets weather data from lat + lon

async function getWeatherData(lat, lon) {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=be9b75a065e73e1cac727dcc8207ba9e"
  );

  response.json().then(function (response) {
    console.log(response);
  });
}

getWeatherDataByCity(city);
