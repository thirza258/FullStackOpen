// components/BlogDetail.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBlog } from '../reducers/blogReducer'; // Import the action to fetch a single blog

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id));

  useEffect(() => {
    dispatch(fetchBlog(id)); // Fetch the blog data when the component mounts
  }, [dispatch, id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>URL: <a href={blog.url}>{blog.url}</a></p>
      <p>Likes: {blog.likes}</p>
      <button onClick={() => dispatch(likeBlog(blog.id))}>Like</button>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      {/* Implement functionality to add new comments */}
    </div>
  );
};

export default BlogDetail;
