import { useState, useEffect, createRef, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Login from './components/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { addBlog, likeBlog, deleteBlog, initializeBlogs} from './reducers/blogReducer'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'
import BlogDetail from './components/BlogDetail'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {

  const user = useSelector(state => state.user.user)
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()
  const [loading, setLoading] = useState(true)
  // const [notification, setNotification] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    console.log('blogger', blogs)
    setLoading(false)
  }, [])

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  // const blogFormRef = createRef()

  const notify = (message, type = 'success') => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const handleLogin = async (credentials) => {
    dispatch(loginUser(credentials))
      .then(() => notify(`Welcome back, ${credentials.username}`))
      .catch(() => notify('Wrong credentials', 'error'));
  };

  const handleCreate = async (blog) => {
    dispatch(addBlog(blog))
    blogFormRef.current.toggleVisibility()
  }

  const handleVote = (blog) => {
    dispatch(likeBlog(blog.id))
  }

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login  handleLogin={handleLogin}/>
      </div>
    )
  }

  const byLikes = (a, b) => b.likes - a.likes
  
  if (loading) {
    return <div>Loading...</div>
  }

  return (
      <div className="container">
        <h2>blogs</h2>
        <Notification />
        <div>
          <Link to="/">blogs</Link>
          <Link to="/users">users</Link>
          {user?.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
        <Routes>
          <Route path="/" element={
            <>
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <NewBlog doCreate={handleCreate} />
              </Togglable>
              {blogs.map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleVote={handleVote}
                  handleDelete={handleDelete}
                  handleBlogDetail={() => <Navigate to={`/blogs/${blog.id}`} />}
                />
              )}
            </>
          } />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

    )
}

export default App