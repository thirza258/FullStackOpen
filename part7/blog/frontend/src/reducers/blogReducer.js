import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

console.log('hellow')
const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
      createBlog(state, action) {
        state.push(action.payload);
      },
      voteBlog(state, action) {
        const id = action.payload;
        const blogToChange = state.find(b => b.id === id);
        if (blogToChange) {
          blogToChange.likes += 1;
          state.sort((a, b) => b.likes - a.likes);
        }
      },
      appendBlog(state, action) {
        console.log('Appending blog:', action.payload);
        state.push(action.payload);
      },
      setBlogs(state, action) {
        console.log('Setting blogs, state now:', state);
        return action.payload;
      },
      setBlog(state, action) {
        const updatedBlog = action.payload;
        return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog);
      }
    },
  });
  

  
//   export default blogSlice.reducer;

// src/reducers/blogReducer.js

export const initializeBlogs = () => {
    return async dispatch => {
      try {
        console.log("Fetching blogs from the server...");
        const blogs = await blogService.getAll();
        console.log("Blogs fetched:", blogs);
        dispatch(setBlogs(blogs));
        console.log("Dispatch successful");
      } catch (error) {
        console.error("Failed to initialize blogs:", error);
      }
    };
  };
  
  export const addBlog = (newBlog) => {
    return async dispatch => {
      try {
        const blog = await blogService.create(newBlog)
        dispatch(createBlog(blog))
        dispatch(setNotification(`Blog created: ${blog.title}, ${blog.author}`, 'success'))
      } catch (error) {
        dispatch(setNotification(`Error creating blog: ${error.message}`, 'error'))
        console.error(error)
      }
    }
  }
  
  export const likeBlog = (id) => {
    return async (dispatch, getState) => {
      try {
        const blogToChange = getState().blogs.find(b => b.id === id)
        const updatedBlog = await blogService.update(id, { ...blogToChange, likes: blogToChange.likes + 1 })
        dispatch(voteBlog(updatedBlog.id))
        dispatch(setNotification(`You liked ${updatedBlog.title} by ${updatedBlog.author}`, 'success'))
      } catch (error) {
        dispatch(setNotification(`Error liking blog: ${error.message}`, 'error'))
        console.error(error)
      }
    }
  }
  
  export const deleteBlog = (id) => {
    return async dispatch => {
      try {
        await blogService.remove(id)
        dispatch(setBlogs(state => state.filter(b => b.id !== id)))
        dispatch(setNotification(`Blog removed`, 'success'))
      } catch (error) {
        dispatch(setNotification(`Error removing blog: ${error.message}`, 'error'))
        console.error(error)
      }
    }
  }

  export const fetchBlog = id => async dispatch => {
    const blog = await blogService.get(id);
    dispatch(setBlog(blog));
  };
  
export const { createBlog, voteBlog, appendBlog, setBlogs, setBlog } = blogSlice.actions;
export default blogSlice.reducer