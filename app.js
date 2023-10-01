// API KEY = be9b75a065e73e1cac727dcc8207ba9e //

// selectors and variables //
let metric = true
let city = "cardiff";
const searchBarButton = document.querySelector("#search-bar-btn");
const SearchBarInput = document.querySelector("#search-bar-text");
const imperialBtn = document.querySelector("#imperial-button")
const metricBtn = document.querySelector("#metric-button")

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
const weatherIcon = document.querySelector("#weather-icon")


// search bar functions //

searchBarButton.addEventListener("click", () => {
  if (SearchBarInput.value) {
    getWeatherDataByCity(SearchBarInput.value);
    city = SearchBarInput.value
  } 
});

document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    if (SearchBarInput.value) {
      getWeatherDataByCity(SearchBarInput.value);
      city = SearchBarInput.value
    } 
  }
});

// metric/imperial button functionality //

imperialBtn.addEventListener("click", () => {
  if(metric) {
    metric = false
    getWeatherDataByCity(city)
    imperialBtn.classList.add("white-border")
    metricBtn.classList.remove("white-border")
  }
})

metricBtn.addEventListener("click", () => {
  if(!metric) {
    metric = true
    getWeatherDataByCity(city)
    metricBtn.classList.add("white-border")
    imperialBtn.classList.remove("white-border")
  }
})

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

    const currentTime = formatDate(new Date())
    const iconcode = response.weather[0].icon
    const iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";

    cityLocation.textContent = response.name + ", " + response.sys.country
    currentDate.textContent = currentTime
    humidity.textContent = response.main.humidity + "%"
    cloudiness.textContent = response.clouds.all + "%"
    description.textContent = capitalizeWords(response.weather[0].description)
    sunrise.textContent = unixTimeToStandardTime(response.sys.sunrise + response.timezone)
    sunset.textContent = unixTimeToStandardTime(response.sys.sunset + response.timezone)
    weatherIcon.src = iconurl
    
    if (metric) {
  
      temp.textContent = Math.round(response.main.temp - 273.15) + "°C"
      feelsLike.textContent = "Feels like " + Math.round(response.main.feels_like - 273.15) + "°C"
      wind.textContent = response.wind.speed + "m/s"
      visibillity.textContent = (response.visibility / 1000) + "km"
    }

    else {
      temp.textContent = Math.round(kelvinToFahrenheit(response.main.temp)) + "°F"
      feelsLike.textContent = "Feels like " + Math.round(response.main.feels_like - 459.67) + "°F"
      wind.textContent = Math.round((response.wind.speed * 1.944)) + "knots"
      visibillity.textContent = Math.round((response.visibility / 1609)) + "miles"
    }
  });
}


// Function to capitalise the first letter of each word within a string //

function capitalizeWords(str) {

  const words = str.split(' ');

  const capitalizedWords = words.map(word => {
    if (word.length === 0) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const capitalizedStr = capitalizedWords.join(' ');

  return capitalizedStr;
}

// function to convert unix time to standard time //

function unixTimeToStandardTime(unixTimestamp) {

  const date = new Date(unixTimestamp * 1000);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');


  const standardTime = `${hours}:${minutes}`;

  return standardTime;
}

// function to format the date //

function formatDate(date) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12 || 12;

  const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year} | ${hours}:${minutes.toString().padStart(2, '0')}${ampm}`;

  return formattedDate;
}

// kelvin to farenheit //

function kelvinToFahrenheit(kelvin) {
  const fahrenheit = (kelvin - 273.15) * 9/5 + 32;
  return fahrenheit;
}



getWeatherDataByCity(city)