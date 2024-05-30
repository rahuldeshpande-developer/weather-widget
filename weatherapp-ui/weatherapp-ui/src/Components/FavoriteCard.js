export default function FavoriteCard(props){

    function handleClick(){
        props.onClick(props.index);        
    }

    return(        
        <div className="card favcard" style={{width: "18em"}}>
             <img className = "hover-zoom" src = {props.weatherData["imageUrl"]} />
            <div className="card-body">
                <h5 className="card-title">{props.weatherData["location"]["name"]}</h5>
                <p className="card-text">The temperature is: {props.weatherData["current"]["temp_c"]}°C, Humidity is {props.weatherData["current"]["humidity"]} %</p>
                <button className="btn btn-primary" onClick={handleClick}>Set Active</button>
            </div>
            </div>
    )
}