import React,{ createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
        return action.payload
        case 'CLEAR_NOTIFICATION':
        return null
        default:
        return state
    }
}

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, '')
  
    return (
      <NotificationContext.Provider value={{ notification, dispatch }}>
        {children}
      </NotificationContext.Provider>
    )
  }
  
  // Custom hooks to use the notification context
  export const useNotificationContent = () => {
    const context = useContext(NotificationContext)
    if (!context) {
      throw new Error('useNotificationContent must be used within a NotificationProvider')
    }
    return context.notification
  }
  
  export const useNotificationDispatch = () => {
    const context = useContext(NotificationContext)
    if (!context) {
      throw new Error('useNotificationDispatch must be used within a NotificationProvider')
    }
    return context.dispatch
  }
export default NotificationContext