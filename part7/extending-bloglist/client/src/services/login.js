import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials).catch(error => console.error(error))
  if (!response) {
    return null
  }
  return response.data
}

export default { login }