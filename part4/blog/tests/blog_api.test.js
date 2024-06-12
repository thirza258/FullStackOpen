const { test, after, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  const assert = require('assert')

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      assert.strictEqual(typeof blog.id, 'string')
      assert.strictEqual(blog._id, undefined)
    })
  })
  
  describe('POST /api/blogs', () => {
    test('successfully creates a new blog post', async () => {
      const initialBlogs = await api.get('/api/blogs');
      const initialCount = initialBlogs.body.length;
  
      const newBlog = {
        title: 'Test Blog',
        author: 'Tester',
        url: 'http://testblog.com',
        likes: 0
      };
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
  
      const blogsAfterPost = await api.get('/api/blogs');
      const finalCount = blogsAfterPost.body.length;

        assert.strictEqual(finalCount, initialCount + 1, `The number of blogs should increase by one {${finalCount} !== ${initialCount}}`);

        const contentCheck = blogsAfterPost.body.map(blog => blog.title);
        assert(contentCheck.includes('Test Blog'), 'The new blog post should be found in the database');
    })
})

describe('POST /api/blogs', () => {
    test('defaults the likes property to 0 if missing', async () => {
      const newBlogWithoutLikes = {
        title: 'Test Blog Without Likes',
        author: 'Tester',
        url: 'http://testblognolikes.com'
        // Notice the 'likes' property is not included
      };
  
      const response = await api
        .post('/api/blogs')
        .send(newBlogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/);
  
        assert.strictEqual(response.body.likes, 0, 'The likes property should default to 0')
  
      // Clean up: remove the test blog pos; 
    });

    test('responds with 400 Bad Request if title is missing', async () => {
        const newBlogWithoutTitle = {
          author: 'Tester',
          url: 'http://testblog.com',
          likes: 0
        };
    
        await api
          .post('/api/blogs')
          .send(newBlogWithoutTitle)
          .expect(400);
      });
    
      test('responds with 400 Bad Request if url is missing', async () => {
        const newBlogWithoutUrl = {
          title: 'Test Blog',
          author: 'Tester',
          likes: 0
        };
    
        await api
          .post('/api/blogs')
          .send(newBlogWithoutUrl)
          .expect(400);
      });
    
      
}) 


  
after(async () => {
    await mongoose.connection.close()
})