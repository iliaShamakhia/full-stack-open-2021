import React from 'react';

const PersonForm=(props)=>{
    return (
        <form onSubmit={props.handleAdd}>
        <div>
          name: <input value={props.newName} onChange={props.changeName} />
          <div>number: <input value={props.newNumber} onChange={props.changeNumber}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
}
export default PersonForm;