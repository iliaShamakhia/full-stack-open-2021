import axios from "axios";

const url ='http://localhost:3001/persons';

const getAll = () => {
    return axios.get(url);
}
  
const create = newPerson => {
    return axios.post(url, newPerson);
}
  
const update = (id, newPerson) => {
    return axios.put(`${url}/${id}`, newPerson);
}

const deletePerson=(id)=>{
    return axios.delete(`${url}/${id}`);
}
  
export default {getAll,create,update,deletePerson}