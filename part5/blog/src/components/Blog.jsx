import { useState } from 'react';


const Blog = ({ blog, handleLike , handleDelete}) => {
  const [showDetail, setShowDetail] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className="blogItem" style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
      </div>
      <button onClick={() => setShowDetail(!showDetail)}>
        Show {showDetail ? 'less' : 'more'}
      </button>
      {showDetail && (
        <div>
          <p> url : {blog.url}</p> {/* Assuming blog has a 'content' property */}
          <p>likes : {blog.likes}</p> {/* Assuming blog has a 'date' property */}
          {/* Add more details as needed */}
          {/* <p>user : {blog.user.username}</p> */}
          <button onClick={handleLike}>like</button>
          <button onClick={handleDelete}>delete</button>
        </div>
      )}
    </div>
  );
};
  
  export default Blog