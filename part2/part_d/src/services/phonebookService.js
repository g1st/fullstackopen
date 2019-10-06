import axios from 'axios';

const baseUrl = `/api/persons`;

const addPerson = person => axios.post(baseUrl, person).then(res => res.data);

const deletePerson = id =>
  axios.delete(`${baseUrl}/${id}`).then(res => res.data);

const updatePerson = (id, newPerson) =>
  axios.put(`${baseUrl}/${id}`, newPerson).then(res => res.data);

export default { addPerson, deletePerson, updatePerson };
