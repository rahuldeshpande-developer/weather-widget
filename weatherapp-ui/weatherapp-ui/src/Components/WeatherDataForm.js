export default function WeatherDataForm(props){

    return (
        <div>
            <label htmlFor="text" className="form-label">Enter your city</label>
            <div className="input-group">
                <input type = 'text' id = 'city' className= "form-control" onChange={props.onInputChange}></input>
            </div>
            <button className = "btn btn-primary" onClick = {props.onSubmit}>Submit</button>
        </div>
    )
}