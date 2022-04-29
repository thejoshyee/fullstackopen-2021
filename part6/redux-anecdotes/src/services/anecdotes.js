import axios from 'axios'


const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
    const object = { content: content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

const voteFor = async (id) => {
  const anecdoteObjToUpdate = await axios.get(`${baseUrl}/${id}`)
  const anecdoteToUpdate = anecdoteObjToUpdate.data
  const updatedAnecdote = {
    ...anecdoteToUpdate,
    votes: anecdoteToUpdate.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data
}

export default { getAll, createAnecdote, voteFor }