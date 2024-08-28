import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
    let [city, setcity] = useState("");
    let [error, setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_key = "71c39bd0b0d29ee37786b5f4fe2c81a3";

    let getWeatherInfo = async() => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_key}&units=metric`);
            let jsonResponse = await response.json();

            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                pressure: jsonResponse.main.pressure,
                weather: jsonResponse.weather[0].description,
            };
            console.log(result);
            return result;
        }catch(err){
            throw err;
        }
    };

    let handleChange = (evt) => {
        setcity(evt.target.value);
    };

    let handleSubmit = async(evt) => {
        try{
            evt.preventDefault();
            console.log(city);
            setcity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        }catch(err){
            setError(true);
        }
    };
    return(
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
             < TextField id="City" label="City Name" variant="outlined" required value={city} onChange={handleChange}/>
             <br></br><br></br>
             <Button variant="contained" type="submit" >Search</Button>
             {error && <p style={{color: "red"}}>No such place exists in our API!</p>}
            </form>
        </div>
    );
}