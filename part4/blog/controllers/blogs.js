const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/api/blogs', (request, response) => {
  const blog = request.body

  const blogs = new Blog( {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  })

  blogs.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter