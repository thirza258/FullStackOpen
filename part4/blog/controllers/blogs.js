const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/api/blogs', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch(error) {
    next(error)
  }
})

blogRouter.post('/api/blogs', async (request, response, next) => {
  try {
    const blog = request.body

    if (!blog.title || !blog.url) {
      return response.status(400).json({ error: 'title or url missing' })
    }

    if (!blog.likes) blog.likes = 0

    const blogs = new Blog( {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    })

    const savedNote = await blogs.save()
    response.status(201).json(savedNote)
  } catch(error) {
    next(error)
  }
})

blogRouter.delete('/api/blogs/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
})

blogRouter.put('/api/blogs/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const blog = request.body;

    const updatedBlog = {
      title: blog.title,
    }

    const result = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
    response.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = blogRouter