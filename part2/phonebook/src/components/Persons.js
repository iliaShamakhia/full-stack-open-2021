import React from 'react';
import Person from './Person';

const Persons=(props)=>{
    return(
        <div>
            {props.persons.map((person,i)=><Person key={i} name={person.name} number={person.number}/>)}
        </div>
    );
}

export default Persons;