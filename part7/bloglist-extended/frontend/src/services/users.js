import axios from 'axios'

let token = null
const baseUrl = '/api/users'

const STORAGE_KEY = 'loggedBlogAppUser'

const setUser = (user) => {
  window.localStorage.setItem(
    STORAGE_KEY, JSON.stringify(user)
  )
  token = user.token
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}


const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }

  return null
}

const clearUser = () => {
  localStorage.clear()
  token = null
}

const getToken = () => token

export default {
  setUser, getUser, clearUser, getToken, getAll
}