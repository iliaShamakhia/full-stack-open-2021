import React from 'react'

const Blog = ({ blog, i }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <div style={blogStyle} className={'blog-'+i}>
      <div>{blog.title} {blog.author}</div>
    </div>
  )
}

export default Blog