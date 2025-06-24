import axios from 'axios';
import { getUserLocation } from "./components/location";
import {getCurrentWeatherForLocation} from "./components/weatherApi";

let location = localStorage.getItem('location') || getUserLocation();
localStorage.setItem('location', location);

document.getElementById('changeLocation').addEventListener('click', function (){

    location = getUserLocation();

    localStorage.setItem('location', location);
});

const response = await getCurrentWeatherForLocation(location);

if(!response.data.current.is_day) {
    document.querySelector('body').style.backgroundColor = '#383838';
}

console.log(response.data.current);
