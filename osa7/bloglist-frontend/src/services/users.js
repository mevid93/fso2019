import axios from 'axios'
const baseUrl = '/api/users'

let TOKEN = null

const setToken = (newToken) => {
  TOKEN = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: TOKEN }
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

export default { getAll, setToken }