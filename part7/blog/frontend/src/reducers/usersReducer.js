// reducers/usersSlice.js
import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';  // Adjust the path to your users service

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const initializeUsers = () => async dispatch => {
  const users = await loginService.getAll();
  console.log('users', users);
  dispatch(setUsers(users));
};

export default usersSlice.reducer;
