import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, ...props }) => {

  if (blog === undefined) { return null }

  const user = props.user
  const createdByLoggedUser = { display: user.username === blog.user.username ? '' : 'none' }

  const handleLike = async () => {
    props.likeBlog(blog)
  }

  const handleRemove = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      props.removeBlog(blog.id)
    }
  }

  return (
    <div>
      <div>
        <h2>{blog.title} {blog.author}</h2>
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes <button onClick={handleLike}>like</button></div>
        <div>added by {blog.user.name}</div>
        <button style={createdByLoggedUser} onClick={handleRemove}>remove</button>
      </div>
      <h3>comments</h3>
      <ul>
        {blog.comments.map(c => <li key={c.id}>{c.content}</li>)}
      </ul>
    </div >
  )

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { likeBlog, removeBlog })(Blog)