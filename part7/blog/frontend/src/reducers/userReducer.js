import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login'; // Adjust the path to your login service
import storage from '../services/storage'; // Adjust the path to your storage service

const initialState = {
  user: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setStatus, setError } = userSlice.actions;

export const initializeUser = () => dispatch => {
  const user = storage.loadUser();
  if (user) {
    dispatch(setUser(user));
  }
};

export const loginUser = credentials => async dispatch => {
  dispatch(setStatus('loading'));
  try {
    const user = await loginService.login(credentials);
    dispatch(setUser(user));
    storage.saveUser(user);
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setError('Wrong credentials'));
    dispatch(setStatus('failed'));
  }
};

export const logoutUser = () => dispatch => {
  storage.removeUser();
  dispatch(clearUser());
};

export default userSlice.reducer;