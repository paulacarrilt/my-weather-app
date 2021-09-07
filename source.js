function displayTemp(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let condition = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let icon = document.querySelector("#icon");

  celsiusTemp = Math.round(response.data.main.temp);

  document.querySelector("#wind").innerHTML = `Wind: ${wind} km/hr`;
  document.querySelector("#humidity").innerHTML = `Humidity: ${humidity}%`;
  document.querySelector("#search-temp").innerHTML = `${temp}`;
  document.querySelector("#condition").innerHTML = `${condition}`;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
        <div class="weather-forecast-day">${day}</div>
             <img
             src="https://openweathermap.org/img/wn/09d@2x.png"
             alt=""
             width="40px"/>
        <div class="weather-forecast-temp">
        <span class="weather-forecast-temp-max">18 </span> / <span class="weather-forecast-temp-min">12</span>
        </div>
    </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "255c628f3138fd0c120d0f964422f059";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchCity(event) {
  event.preventDefault();
  let cityEnter = document.querySelector("#search-input");
  let apiKey = "255c628f3138fd0c120d0f964422f059";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEnter.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function displayFaTemp(event) {
  event.preventDefault();
  let faTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let tempElement = document.querySelector("#search-temp");
  tempElement.innerHTML = faTemp;
  ceLink.classList.remove("active");
  faLink.classList.add("active");
}
function displayCeTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#search-temp");
  tempElement.innerHTML = celsiusTemp;
  ceLink.classList.add("active");
  faLink.classList.remove("active");
}

let faLink = document.querySelector("#fa-link");
faLink.addEventListener("click", displayFaTemp);

let ceLink = document.querySelector("#ce-link");
ceLink.addEventListener("click", displayCeTemp);

let celsiusTemp = null;

let form = document.querySelector("#search-bar");
form.addEventListener("submit", searchCity);

let locationButton = document.querySelector("#current-button");
locationButton.addEventListener("click", displayCurrentLocation);

let now = new Date();
let dateHeading = document.querySelector("h3");
let time = document.querySelector("#time");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
];

let month = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

dateHeading.innerHTML = `${day[now.getDay()]}`;

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

time.innerHTML = `${hours}:${minutes}`;

displayForecast();
displayCurrentLocation();
