import ReactDOM from 'react-dom/client'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux' 
import App from './App'
import {configureStore} from '@reduxjs/toolkit'
import anecdoteService from './services/anecdote'

import anecdoteReducer, { appendAnecdote, setAnecdote }from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import store from './store'

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)