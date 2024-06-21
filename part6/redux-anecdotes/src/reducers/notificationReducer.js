import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
        return action.payload
        },
        clearNotification() {
        return ''
        }
    }
})

export const { setNotification, clearNotification } = notificationReducer.actions

export const showNotification = (message, timeout) => {
    return async (dispatch) => {
      dispatch(setNotification(message));
  
      setTimeout(() => {
        dispatch(clearNotification());
      }, timeout * 1000);
    };
  };

export default notificationReducer.reducer
