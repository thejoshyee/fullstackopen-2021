import { createSlice } from '@reduxjs/toolkit'
const getId = () => (100000 * Math.random()).toFixed(0)

const notificationsToStart = ['this is a notification', 'hello']

const asObject = (notification) => {
    return {
      content: notification,
      id: getId()
    }
  }
  
const initialState = notificationsToStart.map(asObject)

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      setNotification(state, action) {
        const content = action.payload
        state.push({
            content,
            id: getId()
        })
      },
      emptyNotification(state, action) {
        const content = action.payload
        state.push({
          content,
        })
      }
    }
  })
  
  export const { setNotification, emptyNotification } = notificationSlice.actions
  export default notificationSlice.reducer