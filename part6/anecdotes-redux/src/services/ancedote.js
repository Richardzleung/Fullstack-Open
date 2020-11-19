import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const object = {content, votes:0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = async (id) => {
  const url = `${baseUrl}/${id}`
  const { data } = await axios.get(url)
  const updatedObj = {...data, votes: data.votes + 1}
  const response = await axios.put(url, updatedObj).catch(error => console.log(error))
  return response.data
}

export default { getAll, create, updateVote }