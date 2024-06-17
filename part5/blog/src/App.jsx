import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [newLikes, setNewLikes] = useState(0)
  const [errorMessage, setErrorMessage] = useState(null)
  const noteFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

 const logout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogsappUser')
    setUser(null)
 }


  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogsappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Error: Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    await blogService.create(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
    setNewLikes(0)
    setBlogs(blogs.concat(blogObject))
    setErrorMessage(`A new blog ${newTitle} by ${newAuthor} added`)
  }

  const blogForm = () => (
    <Toggleable buttonLabel='new blog' ref={noteFormRef}>
      <BlogForm createBlog={addBlog} 
        newTitle={newTitle} setNewTitle={setNewTitle}
        newAuthor={newAuthor} setNewAuthor={setNewAuthor}
        newURL={newURL} setNewURL={setNewURL}
        newLikes={newLikes} setNewLikes={setNewLikes} 
      />
    </Toggleable>
  )

  const loginForm = () => {
    return (
      <Toggleable buttonLabel='login'>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </Toggleable>
    );
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />

      {user === null ?
    loginForm() :
    <div>
      <p>{user.name} logged-in</p><button onClick={logout}>logout</button>
      {blogForm()}
      </div>  
    }

      <h2>blogs</h2>
      <button onClick={()=> setShowDetail(!showDetail)}>
        show {showDetail ? 'less' : 'more'}
      </button>
      
      {blogs.map(blog =>
        <Blog className="blogItem" key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App