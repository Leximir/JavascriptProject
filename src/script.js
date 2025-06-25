import axios from 'axios';
import { getUserLocation } from "./components/location";
import {getCurrentWeatherForLocation, getWeatherForUpcomingDays, getWeatherInFuture} from "./components/weatherApi";
import {getDateInFuture} from "./helpers/dateHelper" ;
import {getGeoLocationForCoords} from "./components/openWeatherApi";

let location = localStorage.getItem('location') || getUserLocation();
updateLocation(location);

document.getElementById('changeLocation').addEventListener('click', function (){

    updateLocation(getUserLocation());
});

document.getElementById('showWeatherForMyLocation').addEventListener('click', async function (){

    if(!navigator.geolocation){
        return alert("Vas browser ne podrzava prikazivanje geo lokacije");
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        let coords = await getGeoLocationForCoords(lat, lon);

        let cityName = coords.data[0]['name'];

        if(cityName.includes('Municipality')){
            cityName = cityName.replace('Municipality', "");
        }

        updateLocation(cityName);

        console.log(cityName);
    });

});

const response = await getCurrentWeatherForLocation(location);

if(!response.data.current.is_day) {
    document.querySelector('body').style.backgroundColor = '#383838';
}

console.log(response.data.current);

const forecastResponse = await getWeatherForUpcomingDays(location, 3);

let upcomingTemps = document.getElementsByClassName('upcoming-temps')[0];

let collection = document.createElement('ul');

for(let forecast of forecastResponse.data.forecast.forecastday){
    console.log("Na dan: " + forecast.date + " maksimalna temperatura ce biti " + forecast.day.maxtemp_c + " a minimalna: " + forecast.day.mintemp_c);

    let temp = document.createElement('li');
    temp.innerText = "Na dan: " + forecast.date + " maksimalna temperatura ce biti " + forecast.day.maxtemp_c + " a minimalna: " + forecast.day.mintemp_c;

    collection.append(temp);
    upcomingTemps.append(collection);
}

const dateFormatted = getDateInFuture(30);
//const futureWeather = await getWeatherInFuture(location, dateFormatted);
// Ne radi jer je free trial

function updateLocation(newLocation){
    location = newLocation;

    localStorage.setItem('location', newLocation);
}


// Domaci
let currentLocation = localStorage.getItem('location');
let currentCityName = document.getElementsByClassName('city-name')[0];
currentCityName.innerHTML = currentLocation;

let currentCityTemperature = document.getElementsByClassName('city-temp')[0];
currentCityTemperature.innerHTML = response.data.current.temp_c + " °C";
