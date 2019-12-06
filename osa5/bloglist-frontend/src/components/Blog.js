import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [showAllInfo, setShowAllInfo] = useState(false)
  const showWhenAllInfo = { display: showAllInfo ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} onClick={() => setShowAllInfo(!showAllInfo)}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenAllInfo}>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes <button>like</button></div>
        <div>added by {blog.user.name}</div>
      </div>
    </div >
  )

}


export default Blog