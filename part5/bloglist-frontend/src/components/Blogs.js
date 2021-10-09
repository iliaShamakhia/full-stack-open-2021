import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'

const Blogs = ({ blogFormRef, handleCreate, blogs, handleLike, handleRemove, user }) => {
  return(
    <div className='blogs'>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm handleCreate={handleCreate}/>
      </Togglable>
      {blogs.sort((a,b) => b.likes-a.likes).map((blog,i) =>
        <Link to={`/blogs/${blog.id}`} key={blog.id}><Blog blog={blog} i={i} handleLike={handleLike} handleRemove={handleRemove} user={user}/></Link>
      )}
    </div>
  )
}

export default Blogs