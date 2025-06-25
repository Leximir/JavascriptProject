import axios from "axios";
export async function getCurrentWeatherForLocation(location){


    try{
        return await axios.get(process.env.API_URL+"/v1/current.json", {
            params: {
                key: process.env.API_KEY,
                q: location,
                aqi: "no"
            }
        });
    } catch (exception) {
        return alert("Something went wrong with getting the current weather location !");
    }
}

export async function getWeatherForUpcomingDays(location, days){

    try{
        return await axios.get(process.env.API_URL+"/v1/forecast.json", {
            params: {
                key: process.env.API_KEY,
                aqi: 'no',
                alerts: 'no',
                days: days,
                q: location
            }
        });
    } catch (exception) {
        return alert("Something went wrong with getting the weather for upcoming days !");
    }
}

export async function getWeatherInFuture(location, date){

    try{
        return await axios.get(process.env.API_URL+"/v1/future.json", {
            params: {
                key: process.env.API_KEY,
                dt: date,
                q: location
            }
        });
    } catch (exception) {
        return alert("Something went wrong with getting the future weather !");
    }
}