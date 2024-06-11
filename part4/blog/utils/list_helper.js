const dummy = (blogs) => {
    // ...
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
      return sum + item.likes
    }
  
    return blogs.length === 0
      ? 0
      : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
  
    const reducer = (favorite, blog) => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        } else {
            favorite = favorite
        }
        return favorite
    }
  
    return blogs.reduce(reducer, blogs[0])
}
  
const mostLikes = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
  
    const likes = blogs.reduce((acc, blog) => {
      acc[blog.author] = (acc[blog.author] || 0) + blog.likes
      return acc
    }, {})
  
    const author = Object.keys(likes).reduce((acc, author) => {
      return likes[author] > likes[acc]
        ? author
        : acc
    }, Object.keys(likes)[0])
  
    return {
      author,
      likes: likes[author]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikes
}