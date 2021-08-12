import React from 'react';

const Country=(props)=>{
    return(
        <div style={{display:'flex',alignItems:'center'}}>
            <p>{props.country.name}</p>
            <button id={props.id} onClick={props.handleClick} style={{height:'18px',textAlign:'center'}}>show</button>
        </div>
    );
}

export default Country;