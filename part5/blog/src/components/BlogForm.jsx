import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')
    const [newLikes, setNewLikes] = useState(0)

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newURL,
            likes: newLikes
    })

    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
    setNewLikes(0)
  }

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            aria-label="title:"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            aria-label="author:"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            aria-label="url:"
            value={newURL}
            onChange={({ target }) => setNewURL(target.value)}
          />
        </div>
        <div>
          likes:
          <input
            aria-label="likes:"
            value={newLikes}
            onChange={({ target }) => setNewLikes(target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm