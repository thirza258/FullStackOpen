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
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        // Sort blogs by likes in descending order
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error('Error fetching blogs', error);
      }
    };

    fetchBlogs();
  }, []);

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

  const handleLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      });

      const sortedBlogs = blogs
        .map(b => (b.id !== blog.id ? b : updatedBlog))
        .sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    } catch (exception) {
      setErrorMessage('Error: Could not update blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  const handleDelete = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId);
      setBlogs(blogs.filter(blog => blog.id !== blogId));
    } catch (exception) {
      setErrorMessage('Error: Could not delete blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

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
      <div>
      {blogs.map(blog =>
        <Blog className="blogItem"  key={blog.id} blog={blog} handleLike={() => handleLike(blog)} handleDelete={() => handleDelete(blog.id)} />
      )}
      </div>
      
    </div>
  )
}

export default App