import axios from "axios";

const apiKey = 'b6874aea855542958f4191441251902';

export async function getCurrentWeatherForLocation(location){
    const response = await axios.get("https://api.weatherapi.com/v1/current.json", {
        params: {
            key: apiKey,
            q: location,
            aqi: "no"
        }
    });

    return response;
}