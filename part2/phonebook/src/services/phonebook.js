import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const updateNumber = (id, updatedEntry) => {
  const request = axios.put(`${baseUrl}/${id}`,updatedEntry)
  return request.then(response => response.data)
}

const deleteEntry = (persons,setPersons,people) => {
  if (window.confirm(`Delete? ${persons.name}`)) { 
    axios
      .delete(`${baseUrl}/${persons.id}`)
      .then(()=>{
        setPersons(people.filter(entry => entry.id != persons.id))
      })
  }
  return null
}
  
export default { getAll,create , updateNumber, deleteEntry}