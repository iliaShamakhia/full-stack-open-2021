import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [newNumber, setNewNumber]=useState('');
  const [filter, setFilter]=useState('');
  const [showAll,setShowAll]=useState(true);
  const personsToShow = showAll?persons:persons.filter(person=>person.name.toLowerCase().startsWith(filter));
  useEffect(()=>{
    axios.get("http://localhost:3001/persons").then(resp=>{
      setPersons(resp.data);
    })
  },[]);
  const handleAdd=(e)=>{
    e.preventDefault();
    let found=persons.find((elem)=>elem.name===newName);
    if(found){
      alert(`${newName} is already added to phonebook`);
    }else{
      let a={name:newName,number:newNumber};
      setPersons(persons.concat(a));
      setNewName('');
      setNewNumber('');
    }
  };
  const handleFilter=(e)=>{
    setFilter(e.target.value);
    setShowAll(false);
  };
  const changeName=(e)=>{
    setNewName(e.target.value);
  };
  const changeNumber=(e)=>{
    setNewNumber(e.target.value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h3>Add a new</h3>
      <PersonForm handleAdd={handleAdd} newName={newName} newNumber={newNumber} changeName={changeName} changeNumber={changeNumber}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App