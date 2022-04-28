import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      notification: notificationReducer
    }
  })

  anecdoteService.getAll().then(anecdotes => {
    store.dispatch(setAnecdotes(anecdotes))
  })

export default store