// 1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}

import axios from "axios";

export async function getGeoLocationForCoords(lat, lon){
    return await axios.get(process.env.OPENWEATHER_API_URL + '1.0/reverse', {
        params: {
            lat: lat,
            lon: lon,
            limit: 1,
            appid: process.env.OPENWEATHER_API_KEY
        }
    });
}