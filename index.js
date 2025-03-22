let btn = document.querySelector("#searchBtn");

btn.addEventListener("click", () => {
  console.log("Button clicked");
  let input = document.querySelector("#search");

  apiCall(input.value);
});

async function apiCall(input) {
  if (input) {
    let response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=49f88cffb66d403cad2211459252203&q=${input}&aqi=no`
    );

    let data = await response.json();

    changeDisplay(data);
  } else {
    alert("Please enter a city name");
  }
}

function changeDisplay({ current, location }) {
  let temp = document.getElementById("temp");
  let city = document.getElementById("city");
  let windSpeed = document.getElementById("windSpeed");
  let humidity = document.getElementById("humidity");
  let pressure = document.getElementById("pressure");

  temp.innerHTML = `${current.temp_c}<sup>o</sup>C`;
  city.innerHTML = `${location.name}`;
  windSpeed.innerHTML = `${current.wind_kph} km/h`;
  humidity.innerHTML = `${current.humidity}%`;
  pressure.innerHTML = `${current.pressure_mb} mb`;
}
