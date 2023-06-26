let city = document.querySelector(".city");
let country = document.querySelector(".country");
let date = document.querySelector(".date");

let weatherFrame = document.querySelector(".weather-frame");
let headerImg = document.querySelector("#headerImg");
let centigrade = document.querySelector("#centigrade");
let weather1 = document.querySelector("#weather1");

let tempPara = document.querySelector("#tempPara");
let windsPara = document.querySelector("#windsPara");
let humidityPara = document.querySelector("#humidityPara");
let weatherPara = document.querySelector("#weatherPara");
let weather = document.querySelector(".weather");

let dt = new Date();
let dayArray = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
let monthArray = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let dat = dt.getDate();
let month = monthArray[dt.getMonth()];
let day = dayArray[dt.getDay()];

navigator.geolocation.getCurrentPosition((location) => {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=43c28e382572099d01e7ac80cbbc7478&units=metric`
  )
    .then((res) => res.json())
    .then((res) => {
      let cityName = res.name;
      city.innerHTML = cityName;

      let countryName = res.sys.country;
      country.innerHTML = countryName;

      date.innerHTML = `${day}, ${month} ${dat}`;

      let temp = Math.round(res.main.temp);
      centigrade.innerHTML = `${temp}<sup id="centigradeSign"><sup>o</sup>C</sup>`;

      let feelTemp = Math.round(res.main.feels_like);
      tempPara.innerHTML = `${feelTemp}<sup id="centigradeSign1"><sup>o</sup>C</sup>`;

      let main = res.weather[0].main;
      weather1.innerHTML = main;
      if (main.toLowerCase() === "clouds") {
        headerImg.src = "./Images/partly_cloudy.png";
        weatherFrame.style.backgroundImage = "url(./Images/haze.svg)";
        weather.childNodes[1].src = "./Images/cloudy.png";
      } else if (main.toLowerCase() === "clear") {
        headerImg.src = "./Images/sunny.png";
        weatherFrame.style.backgroundImage = "url(./Images/clear-day.svg)";
        weather.childNodes[1].src = "./Images/sun.png";
      } else if (main.toLowerCase() === "rain") {
        headerImg.src = "./Images/rain_s_cloudy.png";
        weatherFrame.style.backgroundImage = "url(./Images/rain.svg)";
        weather.childNodes[1].src = "./Images/storm.png";
      } else if (main.toLowerCase() === "haze") {
        headerImg.src = "./Images/haze.png";
        weatherFrame.style.backgroundImage = "url(./Images/smoke.svg)";
        weather.childNodes[1].src = "./Images/fog.png";
      }
      let winds = res.wind.speed;
      windsPara.innerHTML = `${winds} km/h`;

      let humd = Math.round(res.main.humidity);
      humidityPara.innerHTML = `${humd}%`;

      let all = res.clouds.all;
      weatherPara.innerHTML = `${all}%`;
    })
    .catch((rej) => {
      console.log(rej);
    });
});

function searchWeather() {
  let textField = document.querySelector("#textField");
  let searchCity = textField.value;
  textField.value = "";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=43c28e382572099d01e7ac80cbbc7478&units=metric`
  )
    .then((res) => res.json())
    .then((res) => {
      let msg = res.message;
      if (msg === "city not found") {
        swal({
          title: "Error!",
          text: "City not found, Check spelling!",
          type: "error",
          confirmButtonText: "Okay",
        });
      } else {
        let cityName = res.name;
        city.innerHTML = cityName;

        let countryName = res.sys.country;
        country.innerHTML = countryName;

        date.innerHTML = `${day}, ${month} ${dat}`;

        let temp = Math.round(res.main.temp);
        centigrade.innerHTML = `${temp}<sup id="centigradeSign"><sup>o</sup>C</sup>`;

        let feelTemp = Math.round(res.main.feels_like);
        tempPara.innerHTML = `${feelTemp}<sup id="centigradeSign1"><sup>o</sup>C</sup>`;

        let main = res.weather[0].main;
        weather1.innerHTML = main;
        if (main.toLowerCase() === "clouds") {
          headerImg.src = "./Images/partly_cloudy.png";
          weatherFrame.style.backgroundImage = "url(./Images/haze.svg)";
          weather.childNodes[1].src = "./Images/cloudy.png";
        } else if (main.toLowerCase() === "clear") {
          headerImg.src = "./Images/sunny.png";
          weatherFrame.style.backgroundImage = "url(./Images/clear-day.svg)";
          weather.childNodes[1].src = "./Images/sun.png";
        } else if (main.toLowerCase() === "rain") {
          headerImg.src = "./Images/rain_s_cloudy.png";
          weatherFrame.style.backgroundImage = "url(./Images/rain.svg)";
          weather.childNodes[1].src = "./Images/storm.png";
        } else if (main.toLowerCase() === "haze" || main.toLowerCase() === "smoke") {
          headerImg.src = "./Images/haze.png";
          weatherFrame.style.backgroundImage = "url(./Images/smoke.svg)";
          weather.childNodes[1].src = "./Images/fog.png";
        }
        let winds = res.wind.speed;
        windsPara.innerHTML = `${winds} km/h`;

        let humd = Math.round(res.main.humidity);
        humidityPara.innerHTML = `${humd}%`;

        let all = res.clouds.all;
        weatherPara.innerHTML = `${all}%`;
      }
    })
    .catch((rej) => {
      console.log(rej);
    });
}
