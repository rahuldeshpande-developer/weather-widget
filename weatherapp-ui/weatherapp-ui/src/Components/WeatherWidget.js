import { useState, useEffect, act } from "react";
import { LoadState } from "../Common";
import FavoriteCard from "./FavoriteCard";
import ActiveCard from "./ActiveCard";
import WeatherDataForm from "./WeatherDataForm";

export default function WeatherWidget(){

    const [counter, setCounter] = useState(0)
    const [loadState, setLoadState] = useState(LoadState.NotStarted);
    const [error, setError] = useState({})
    const [city, setCity] = useState("")
    const [activeWeatherData, setActiveWeatherData] = useState({});
    const [favorites, setFavorites] = useState([])

    // Fetches weather information from a server.
    function fetchWeatherData(city){
        const url = `/${city}`;
        return new Promise(async function(resolve, reject)
        {            
            setTimeout(async function(){
                try {
                    let response = await fetch(url);
                    let jsonData = await response.json();
                    if(response.ok){
                        resolve(jsonData)    
                    }
                    else{
                        let error = new Error("")
                        error.ResponseBody = jsonData;
                        throw error
                    }
                  } catch(err) {
                    reject(err)
                  }
            }, 2000)            
        })
    }

    // Returns true if the city is in the favorite list already, false otherwise.
    const favoriteExists = (city) => {
        return favorites.some(favorite => favorite["location"]["name"].toLowerCase() == city.toLowerCase());
    }

    // Adds a new city to the favorite list.
    const handleAddFavorite = () => {
        if(favoriteExists(city))
        {
            alert("You've already added this city to your favorite list.");
        }
        else{
            setFavorites(current => {
                return [
                    ...current,
                    Object.assign({}, activeWeatherData)
                ]
            })    
        }
    }

    // Event handler for the Add Favorite button.
    const handleFavoriteClick = (key) => {
        setActiveWeatherData(favorites[key])
    }

    // Event handler for the Submit button.
    const handleSubmit = async () => {
        setLoadState(LoadState.Loading)
        fetchWeatherData(city)
        .then(function(jsonData){
            setLoadState(LoadState.Successful);
            setActiveWeatherData(jsonData);
        }).catch(function(err){
            setError(err.ResponseBody)
            setLoadState(LoadState.Error)
        })
    }

    // Event handle for when the input in the form changes.
    const handleInputChange = (event) => {
        setCity(event.target.value);
    }

    useEffect(() => {
        setTimeout(function(){
            let allPromises = [];
            const favPromises = favorites.map((weatherData, index) => {
                return fetchWeatherData(weatherData["location"]["name"])
                .then(function(jsonData){
                    setFavorites(previous => {
                        const allData = [...previous];
                        allData[index] = jsonData;
                        return allData;
                    })
                })
            })
            allPromises.concat(favPromises);
            // Only restart timer after all current promises have resolved.
            Promise.all(allPromises).then(data => setCounter(count => count + 1))
        }, 2000)
    }, [counter])

    return(
        <div className="container">            
            <div className="container content">
            <h2 className = "weather-widget-title">Weather Widget</h2>
                <WeatherDataForm
                    onSubmit = {handleSubmit}
                    onInputChange = {handleInputChange}
                />
                <ActiveCard
                    weatherData = {activeWeatherData}
                    loadState = {loadState}
                    error = {error}
                />
                <button onClick={handleAddFavorite}>Add to favorites</button>
                <div className="container content favcardcontainer">
                {
                    favorites.map(function(favorite, index){
                        return (<FavoriteCard
                                onClick = {handleFavoriteClick}
                                key = {index}
                                index = {index}
                                weatherData = {favorite}
                                />)
                    })
                }
                </div>
            </div>
        </div>
    )
}