import React,{useState,useEffect} from "react"
import axios from "axios";
import CountryView from "./CountryView";
import CountryList from "./CountryList";
const api_key = process.env.REACT_APP_API_KEY;
const App=()=> {
  const [country,setCountry]=useState('');
  const [countryData,setCountryData]=useState([]);
  const [filtered,setFiltered]=useState(false);
  const [showCountry,setShowCountry]=useState(null);
  
  useEffect(()=>{
    axios.get("https://restcountries.eu/rest/v2/all")
    .then(res=>{
      setCountryData(res.data);
    });
  },[]);
  
  let countriesToShow=filtered?countryData.filter(el=>el.name.toLowerCase().includes(country)):[];
  
  const handleChange=(e)=>{
    setCountry(e.target.value);
    setFiltered(true);
    setShowCountry(null);
  };

  const handleClick=(e)=>{
    setShowCountry(countriesToShow[e.target.id]);
  }
  if(showCountry){
    return(
      <div>
        find countries <input value={country} onChange={handleChange}/>
        <CountryView api_key={api_key} country={showCountry}/>
      </div>
    );
  }
  if(countriesToShow.length===1){
    return(
      <div>
        find countries <input value={country} onChange={handleChange}/>
        <CountryView api_key={api_key} country={countriesToShow[0]}/>
      </div>
    );
  }else if(countriesToShow.length<=10 && countriesToShow.length>1){
    return(
      <div>
        find countries <input value={country} onChange={handleChange}/>
        <CountryList countries={countriesToShow} handleClick={handleClick}/>
      </div>
    );
  }else if(countriesToShow.length===0){
    return(
      <div>
        find countries <input value={country} onChange={handleChange}/>
        <p>No country matches that name</p>
      </div>
    );
  }else{
    return(
      <div>
        find countries <input value={country} onChange={handleChange}/>
        <p>Too many matches,specify another filter</p>
      </div>
    );
  }
}
export default App;
