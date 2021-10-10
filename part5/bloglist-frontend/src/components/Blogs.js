import React from 'react'
//import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = ({ blogFormRef, handleCreate, blogs }) => {
  return(
    <div className='blogs'>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm handleCreate={handleCreate}/>
      </Togglable>
      <Table striped>
        <tbody>
          {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs