import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name: 'notification',
    reducers: {
      setNotification(state, action, text) {
        const content = action.payload
        state.push({
          ...content,
          notification: text
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
  
  export const { notification } = notificationSlice.actions
  export default notificationSlice.reducer