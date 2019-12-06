import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs }) => {
  const [showAllInfo, setShowAllInfo] = useState(false)
  const showWhenAllInfo = { display: showAllInfo ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const blogObject = {
      title: blog.title,
      auhtor: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
      id: blog.id
    }
    const updatedBlog = await blogService.update(blogObject)
    const updatedBlogs = blogs.map(b => b.id != updatedBlog.id ? b : updatedBlog)
    setBlogs(updatedBlogs.sort((a, b) => { return b.likes - a.likes }))
  }

  return (
    <div style={blogStyle} onClick={() => setShowAllInfo(!showAllInfo)}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenAllInfo}>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes <button onClick={handleLike}>like</button></div>
        <div>added by {blog.user.name}</div>
      </div>
    </div >
  )

}


export default Blog