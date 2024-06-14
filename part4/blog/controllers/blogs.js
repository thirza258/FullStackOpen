const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const middleware = require('../utils/middleware')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogRouter.get('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    const user = await User.find({})

    for (let i = 0; i < blogs.length; i++) {
      for (let j = 0; j < user.length; j++) {
        if (blogs[i].user.toString() === user[j]._id.toString()) {
          const user_of_blog = user[j]
        }
      }
    }
    response.json(blogs.map(blog => ({
      url: blog.url,
      author: blog.author,
      user: {
        username: user_of_blog.username,
        name: user_of_blog.name,
        id: user_of_blog._id.toString()
      },
      likes: blog.likes,
      id: blog._id.toString()
    })))
  } catch(error) {
    next(error)
  }
})

blogRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const blog = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!blog.title || !blog.url) {
      return response.status(400).json({ error: 'title or url missing' })
    }

    if (!blog.likes) blog.likes = 0

    const blogs = new Blog( {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: user.id
    })

    const savedBlog = await blogs.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedNote)
  } catch(error) {
    next(error)
  }
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if(blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'token invalid'})
    }
  } catch (error) {
    next(error);
  }
})

blogRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
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