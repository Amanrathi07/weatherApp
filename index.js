let btn = document.querySelector("#searchBtn");

let currLoc= document.getElementById("currLoc");

btn.addEventListener("click", () => {
  console.log("Button clicked");
  let input = document.querySelector("#search");

  apiCall(input.value);
  input.value = "";
  });

async function apiCall(input,latitude,longitude) {
 try{
    
  if (latitude && longitude){
    let response = await fetch (`http://api.weatherapi.com/v1/current.json?key=49f88cffb66d403cad2211459252203&q=${latitude},${longitude}&aqi=no
`);
let data = await response.json();
   
    changeDisplay(data);
    displayDiv();

  }else{
    let response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=49f88cffb66d403cad2211459252203&q=${input}&aqi=no`
    );
    let data = await response.json();
    console.log(data);
    
    changeDisplay(data);
    displayDiv();

  }
    
    
  }catch(err){
    console.log(err);
  }
}

function changeDisplay({ current, location }) {
  let temp = document.getElementById("temp");
  let city = document.getElementById("city");
  let windSpeed = document.getElementById("windSpeed");
  let humidity = document.getElementById("humidity");
  let pressure = document.getElementById("pressure");
  let icon = document.getElementById("icon");
  let disc = document.getElementById("disc");
 
  
  temp.innerHTML = `${current.temp_c}<sup>o</sup>C`;
  city.innerHTML = `${location.name}`;
  windSpeed.innerHTML = `${current.wind_kph} km/h`;
  humidity.innerHTML = `${current.humidity}%`;
  pressure.innerHTML = `${current.pressure_mb} mb`;
  icon.src = current.condition.icon;
  disc.innerHTML = current.condition.text;
}

function displayDiv(){
  let weatherInfo = document.getElementById("weatherInfo");
  let weatherMoreInfo = document.getElementById("weatherMoreInfo");

  weatherInfo.style.display = "flex";
  weatherMoreInfo.style.display = "flex";
  console.log("displayed");
  

}


currLoc.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position)=>{
    let leti =position.coords.latitude;
    let long = position.coords.longitude;
    console.log(leti,long);
    apiCall("",leti,long);
  })
});