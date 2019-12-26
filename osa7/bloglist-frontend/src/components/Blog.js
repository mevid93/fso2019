import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user, ...props }) => {
  const [showAllInfo, setShowAllInfo] = useState(false)
  const showWhenAllInfo = { display: showAllInfo ? '' : 'none' }
  const createdByLoggedUser = { display: user.username === blog.user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    props.likeBlog(blog)
  }

  const handleRemove = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      props.removeBlog(blog.id)
    }
  }

  return (
    <div className="clickableDiv" style={blogStyle} onClick={() => setShowAllInfo(!showAllInfo)}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenAllInfo}>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes <button onClick={handleLike}>like</button></div>
        <div>added by {blog.user.name}</div>
        <button style={createdByLoggedUser} onClick={handleRemove}>remove</button>
      </div>
    </div >
  )

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}


export default connect(null, { likeBlog, removeBlog })(Blog)