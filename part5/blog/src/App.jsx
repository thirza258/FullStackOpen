import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'



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

  

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
      likes: newLikes
    }

    await blogService.create(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
    setNewLikes(0)
    setBlogs(blogs.concat(blogObject))
    setErrorMessage(`A new blog ${newTitle} by ${newAuthor} added`)
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:
          <input
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          value={newURL}
          onChange={({ target }) => setNewURL(target.value)}
        />
      </div>
      <div>
        likes:
          <input
          value={newLikes}
          onChange={({ target }) => setNewLikes(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>  
  )

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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App