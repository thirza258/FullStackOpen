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
import { clearUser, setUser } from './reducers/userReducer'


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
    const user = storage.loadUser()
    if (user) {
      setUser(user)
    }
  }, [])

  // const blogFormRef = createRef()

  const notify = (message, type = 'success') => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      storage.saveUser(user)
      notify(`Welcome back, ${user.name}`)
    } catch (error) {
      notify('Wrong credentials', 'error')
    }
  }

  const handleCreate = async (blog) => {
    dispatch(addBlog(blog))
    blogFormRef.current.toggleVisibility()
  }

  const handleVote = (blog) => {
    dispatch(likeBlog(blog.id))
  }

  const handleLogout = () => {
    // Perform any additional cleanup if needed (e.g., clear local storage)
    storage.removeUser();
    dispatch(clearUser());
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
        <Login  />
      </div>
    )
  }

  const byLikes = (a, b) => b.likes - a.likes
  
  if (loading) {
    return <div>Loading...</div>
  }

  return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          {user?.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <NewBlog doCreate={handleCreate} />
        </Togglable>
        {blogs?.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleVote={handleVote}
            handleDelete={handleDelete}
          />
        )}
      </div>
    )
}

export default App