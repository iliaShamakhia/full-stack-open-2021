import React from 'react';
import Country from './Country';

const CountryList=(props)=>{
    return(
        <div>
            {props.countries.map((elem,i)=><Country id={i} key={elem.numericCode} country={elem} handleClick={props.handleClick}/>)}
        </div>
    );
    
}
export default CountryList;