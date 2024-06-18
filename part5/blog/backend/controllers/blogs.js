const jwt = require('jsonwebtoken')
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

router.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)

  const user = request.user

  if (!user ) {
    return response.status(403).json({ error: 'user missing' })
  }  

  if (!blog.title || !blog.url ) {
    return response.status(400).json({ error: 'title or url missing' })
  }   

  blog.likes = blog.likes | 0
  blog.user = user
  user.blogs = user.blogs.concat(blog._id)

  await user.save()

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

router.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'user missing or invalid' });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(204).end();
  }

  if (user.id !== blog.user) {
    return response.status(403).json({ error: 'user not authorized' });
  }

  await blog.deleteOne();

  user.blogs = user.blogs.filter(b => b._id.toString() !== blog._id.toString());
  await user.save();

  response.status(204).end();
});


router.put('/:id', userExtractor, async (request, response, next) => {
  const body = request.body;

  const user = request.user;

  if (!user) {
    return response.status(403).json({ error: 'user missing' });
  }  

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' });
  }   

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 });;
    if (!updatedBlog) {
      return response.status(404).json({ error: 'blog not found' });
    }

    user.blogs = user.blogs.concat(updatedBlog._id);
    await user.save();

    response.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
   
    response.status(400).json({ error: 'malformed id' });

    next(error);
  }
});
module.exports = router