const lodash = require('lodash')

const dummy = () => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, blog) => {
    return max.likes > blog.likes
      ? max
      : blog
  }

  return blogs.length === 0
    ? '{}'
    : blogs.reduce(reducer)
}
// create array of authors
const mostBlogs = (blogList) => {
  const authAndBlogs = lodash.countBy(blogList, blog => blog.author)
  const maxKey = lodash.maxBy(lodash.keys(authAndBlogs), author => authAndBlogs[author])
  const author = {
    author: maxKey,
    blogs: authAndBlogs[maxKey]
  }

  return blogList.length === 0
    ? '{}'
    : author
}

const mostLikes = (blogList) => {
  if (blogList.length === 0) return '{}'
  const authAndLikes = lodash(blogList)
    .groupBy('author')
    .map((objs,key) => ({ 'author': key , 'likes': lodash.sumBy(objs, 'likes') }))
    .maxBy('likes')

  const author = {
    author: authAndLikes['author'],
    likes: authAndLikes['likes']
  }

  return author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}