import { LoadState } from "../Common";
import { RotatingLines } from 'react-loader-spinner';

export default function ActiveCard(props){

    const activeWeatherData = props.weatherData;
    return (
            
            props.loadState == LoadState.Successful ? 
            (
                <div className="container content">   
                <img className="activecard-image" src= {props.weatherData["imageUrl"]} />                     
                    <h4>
                    {activeWeatherData["location"]["name"]}, {activeWeatherData["location"]["region"]}, {activeWeatherData["location"]["country"]} 
                    </h4>
                    <img className = "weather-icon" src = {activeWeatherData["current"]["condition"]["icon"]}  />
                    <p>
                        It is {activeWeatherData["current"]["condition"]["text"].toLowerCase()} right now.
                    </p>
                    <table className = "table">
                        <tbody>
                            <tr>
                                <td>Temperature (Celsius)</td>
                                <td>{activeWeatherData["current"]["temp_c"]}°C</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td>{activeWeatherData["current"]["humidity"]} %</td>
                            </tr>
                            <tr>
                                <td>Wind Speed</td>
                                <td>{activeWeatherData["current"]["wind_kph"]} Kph</td>
                            </tr>
                            <tr>
                                <td>Day/Night</td>
                                <td>{activeWeatherData["current"]["is_day"] == 1 ? "Day" : "Night"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
            :
            props.loadState == LoadState.Loading ? (
                <div>
                   <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    color="blue"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle
                    wrapperClass
                    />
                </div>
            )
            : 
            props.loadState == LoadState.Error ? (
                <div>
                   {props.error["error"]["message"]}
                </div>
            )
            : 
            (
                <div></div>
            )
        
    )
}