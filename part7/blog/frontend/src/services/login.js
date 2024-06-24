import axios from 'axios'

let baseUrl = 'http://localhost:3003/api/login'
let anotherUrl = 'http://localhost:3003/api/users'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(anotherUrl)
  console.log('response.data', response.data)
  return response.data
}

export default { login, getAll }