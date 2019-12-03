import axios from 'axios'
const baseUrl = '/api/blogs'

let TOKEN = null

const setToken = (newToken) => {
  TOKEN = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blogObject) => {
  const config = {
    headers: { Authorization: TOKEN }
  }
  const request = axios.post(baseUrl, blogObject, config)
  return request.then(response => response.data)
}

export default { getAll, create, setToken }