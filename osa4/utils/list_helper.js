const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const reducer = (prev, current) => prev.likes >= current.likes ? prev : current
  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  const counted = lodash.countBy(blogs, 'author')
  let author = undefined
  let count = 0
  lodash.forEach(counted, (value, key) => {
    if (value > count) {
      author = key
      count = value
    }
  })
  return author === undefined ? undefined : { author: author, blogs: count }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}