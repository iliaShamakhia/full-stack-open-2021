import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {  token = `bearer ${newToken}`}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl,config)
  return response.data
}
const update=async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  let url=baseUrl+'/'+newObject.id
  const response=await axios.put(url,newObject,config)
  return response.data
}

const remove=async id => {
  const config = {
    headers: { Authorization: token },
  }
  let url=baseUrl+'/'+id
  await axios.delete(url,config)
}

const addComment = async (comment,id) => {
  const config = {
    headers: { Authorization: token }
  }
  let obj = { comment }
  let url = baseUrl + `/${id}/` +'comments'
  const response = await axios.post(url,obj,config)
  return response.data
}

export default { getAll, create, setToken, update, remove, addComment }