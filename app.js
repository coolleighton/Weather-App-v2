// API KEY = be9b75a065e73e1cac727dcc8207ba9e //

// selectors and variables //
const metric = true
const city = "new york";
const searchBarButton = document.querySelector("#search-bar-btn");
const SearchBarInput = document.querySelector("#search-bar-text");

const cityLocation = document.querySelector("#location")
const currentDate = document.querySelector("#current-date")
const temp = document.querySelector("#temp")
const description = document.querySelector("#description")
const feelsLike = document.querySelector("#feels-like")
const wind = document.querySelector("#wind")
const humidity = document.querySelector("#humidity")
const cloudiness = document.querySelector("#cloudiness")
const visibillity = document.querySelector("#visibillity")
const sunrise = document.querySelector("#sunrise")
const sunset = document.querySelector("#sunset")



// search bar functions //
searchBarButton.addEventListener("click", () => {
  if (SearchBarInput.value) {
    getWeatherDataByCity(SearchBarInput.value);
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
    console.log(response)
    let currentTime = new Date().toString();
    
    if (metric) {
      cityLocation.textContent = response.name + ", " + response.sys.country
      currentDate.textContent = currentTime
      temp.textContent = Math.round(response.main.temp - 273.15) + "°C"
      description.textContent = response.weather[0].description
      feelsLike.textContent = "Feels like " + Math.round(response.main.feels_like - 273.15) + "°C"
      wind.textContent = response.wind.speed + "m/s"
      humidity.textContent = response.main.humidity + "%"
      cloudiness.textContent = response.clouds.all + "%"
      visibillity.textContent = (response.visibility / 1000) + "km"
      sunrise.textContent = response.sys.sunrise.toString();
      sunset.textContent = response.sys.sunset.toString();



    }
      
  });
}

getWeatherDataByCity(city)

