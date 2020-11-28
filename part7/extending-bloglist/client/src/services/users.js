import axios from 'axios'

const baseUrl = '/api/users'
//const baseUrl = 'http://localhost:3003/api/users'
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUserBlogs = id => {
  const request = axios.get(`${baseUrl}/${id}`)
  console.log('request', request)
  return request.then(response => response.data)
}

export default { getAll, getUserBlogs }