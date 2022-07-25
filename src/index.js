let now = new Date();
let todayDate = document.querySelector(`#date`);
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let day = days[now.getDay()];
let months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `Settember`,
  `October`,
  `November`,
  `December`,
];
let month = months[now.getMonth()];

todayDate.innerHTML = `${day}, ${date} ${month} ${year} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector(`#search-text-input`);
  let h1 = document.querySelector(`h1`);
  h1.innerHTML = `${searchInput.value}`;
  let city = searchInput.value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7606e398d85035b10d42b33b84e4a65a`;

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureToday = document.querySelector(`#tem-today`);
    temperatureToday.innerHTML = `${temperature} °C`;

    let feel = Math.round(response.data.main.feels_like);
    let feelToday = document.querySelector(`#feel-today`);
    feelToday.innerHTML = `${feel} °C`;

    let humidity = Math.round(response.data.main.humidity);
    let humidityToday = document.querySelector(`#humidity`);
    humidityToday.innerHTML = `${humidity} %`;

    let wind = Math.round(response.data.wind.speed);
    let windToday = document.querySelector(`#wind`);
    windToday.innerHTML = `${wind} km / h`;
  }

  axios.get(`${apiUrl}`).then(showTemperature);
}

let form = document.querySelector(`#search-form`);
form.addEventListener(`submit`, search);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let h1 = document.querySelector(`h1`);
  h1.innerHTML = `Your current latitude is ${lat}, your current longitude is ${lon}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=7606e398d85035b10d42b33b84e4a65a`;
  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureToday = document.querySelector(`#tem-today`);
    temperatureToday.innerHTML = `${temperature} °C`;

    let feel = Math.round(response.data.main.feels_like);
    let feelToday = document.querySelector(`#feel-today`);
    feelToday.innerHTML = `${feel} °C`;

    let humidity = Math.round(response.data.main.humidity);
    let humidityToday = document.querySelector(`#humidity`);
    humidityToday.innerHTML = `${humidity} %`;

    let wind = Math.round(response.data.wind.speed);
    let windToday = document.querySelector(`#wind`);
    windToday.innerHTML = `${wind} km / h`;
  }
  axios.get(`${apiUrl}`).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let buttonCurrent = document.querySelector(`.current-position`);
buttonCurrent.addEventListener(`click`, getCurrentPosition);
