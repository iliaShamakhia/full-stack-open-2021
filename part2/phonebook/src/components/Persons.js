import React from 'react';

const Persons=(props)=>{
    return(
        <div>
            {props.persons.map(person=><p key={person.id}>{person.name} {person.number}<button onClick={()=>props.handleDelete(person.name,person.id)}>delete</button></p>)}
        </div>
    );
}

export default Persons;