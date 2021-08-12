import React,{useState,useEffect} from 'react';
import axios from 'axios';

const CountryView=(props)=>{
    let {name,capital,population,languages,flag}=props.country;
    let [weather,setWeather]=useState({current:{temperature:0,wind_speed:0,wind_dir:'',weather_icons:['']}});
    let url=`http://api.weatherstack.com/current?access_key=${props.api_key}&query=${capital}`;
    useEffect(()=>{
        axios.get(url)
        .then(res=>{
        setWeather(res.data);
    });
    },[]);
    let {temperature,wind_speed,wind_dir,weather_icons}=weather.current?weather.current:{temperature:0,wind_speed:0,wind_dir:'',weather_icons:['']};
    return (
        <div>
        <h2>{name}</h2>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <h3>languages</h3>
            <ul>{languages.map((el,i)=><li key={i}>{el.name}</li>)}</ul>
            <img src={flag} alt={name+" flag"}/>
            <h3>Weather in {capital}</h3>
            <p>temperature: {temperature} Celcius</p>
            <img src={weather_icons[0]}alt=""/>
            <p>wind: {wind_speed} mph direction {wind_dir}</p>
        </div>
    );
}

export default CountryView;