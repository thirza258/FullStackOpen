import axios from 'axios'
import storage from './storage'

const baseUrl = 'http://localhost:3003/api/blogs'

const getConfit = () => {
  const user = storage.loadUser();
  if (!user) {
    console.error('User not logged in');
    return { headers: {} };
  }

  return { headers: { Authorization: `Bearer ${user.token}` } };
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, getConfit())
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfit())
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfit())
  return response.data
}

const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, create, update, remove }