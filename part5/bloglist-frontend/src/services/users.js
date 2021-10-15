import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const register = async (name,username,password) => {
  const user = { name,username,password }
  const response = await axios.post(baseUrl,user)
  return response.data
}

export default { getUsers, register }