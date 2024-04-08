import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data).catch(error => console.log(error))
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data).catch(error => console.log(error))
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data).catch(error => console.log(error))
}

export default {getAll, create, update}