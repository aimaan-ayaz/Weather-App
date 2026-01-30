const API_KEY = "d7e15f002e5696d4db89e72674db4a3b"


function weather_show(temp, city, imagecode) {
    temptext = document.getElementById("temp")
    citytext = document.getElementById("weather_location")
    weatheremoji = document.getElementById("emoji")
    city = city.charAt(0).toUpperCase()+city.slice(1)
    temptext.innerHTML = `${temp}<sup><sup>o</sup></sup>C`
    citytext.innerHTML = `This is ${city}'s Weather`
    weatheremoji.src = `https://openweathermap.org/img/wn/${imagecode}@2x.png`
    weatheremoji.style.height = "200px"
    weatheremoji.style.width = "200px"

}

function weather (lat, lon, city) {
let weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
fetch(weather_url)
.then (res=> res.json())
.then (data => {
    console.log(data.weather[0].icon)
    weather_show(Math.round(data["main"]["temp"]-273.15), city, data.weather[0].icon)
})
}

function getlatlon  (city) {
let location_url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
fetch(location_url)
.then (res => res.json())
.then (data => {
    let lat = data[0].lat
    let lon = data[0]["lon"]
    // console.log(lat)
    // console.log(lon)
    weather(lat, lon, city)
})
}

let searchbar = document.getElementById("searchbar");

searchbar.addEventListener("keydown", (e)=> {
    if (e.key== "Enter") {
        const city = searchbar.value.trim();
    if (!city) return;
    getlatlon(city)
    }
})