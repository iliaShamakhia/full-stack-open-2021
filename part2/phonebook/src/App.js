import React, { useState ,useEffect} from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import PersonService from './services/communication';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [newNumber, setNewNumber]=useState('');
  const [filter, setFilter]=useState('');
  const [showAll,setShowAll]=useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [success,setSuccess]=useState(true);
  const personsToShow = showAll?persons:persons.filter(person=>person.name.toLowerCase().startsWith(filter));
  let count;
  useEffect(()=>{
    PersonService.getAll().then(resp=>{
      setPersons(resp.data);
      count=persons.length;
    })
  },[]);
  const handleAdd=(e)=>{
    e.preventDefault();
    let a={name:newName,number:newNumber,id:count};
    let found=persons.find(elem=>elem.name===newName);
    if(found){
      let personToUpd=persons.filter(elem=>elem.name===newName);
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        PersonService.update(personToUpd[0].id,a).then(resp=>setPersons(persons.map(person => person.id !== personToUpd[0].id ? person : resp.data)));
        setSuccess(true);
        setErrorMessage(`updated ${newName}`);
        setTimeout(() => {          
          setErrorMessage(null)        
        }, 5000)
        setNewName('');
        setNewNumber('');
      }
    }else{
      PersonService.create(a)    
      .then(response => {
        setPersons(persons.concat(response.data));
        count++;    
      })
      setSuccess(true);
      setErrorMessage(`Added ${newName}`);        
      setTimeout(() => {          
        setErrorMessage(null)        
      }, 5000)
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
  const handleDelete=(name,id)=>{
    if(window.confirm(`delete ${name}?`)){
      PersonService.deletePerson(id)
      .then(resp=>{
        setSuccess(true);
        setErrorMessage(`deleted ${name}`);
        setTimeout(() => {          
          setErrorMessage(null);
        }, 5000);
        setPersons(persons.filter(per=>per.id!==id));
        count--;
      }).catch(error => {
          setSuccess(false);
          setErrorMessage(`Information of '${name}' has already been removed from server`);
          setPersons(persons.filter(per=>per.id!==id));     
          setTimeout(() => {          
            setErrorMessage(null);
          }, 5000);
        });
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification success={success} message={errorMessage}/>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h3>Add a new</h3>
      <PersonForm handleAdd={handleAdd} newName={newName} newNumber={newNumber} changeName={changeName} changeNumber={changeNumber}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App