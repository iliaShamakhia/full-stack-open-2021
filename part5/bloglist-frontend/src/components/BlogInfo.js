import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const BlogInfo = ({ blogs, handleLike, handleComment }) => {
  const [comment, setComment] = useState('')
  const id = useParams().id
  const blog = blogs.find(bl => bl.id === id)
  if(!blog){
    return null
  }
  return(
    <div>
      <h2>{blog.title}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} likes <button onClick={() => handleLike(blog)}>like</button></p>
      <p>added by {blog.author}</p>
      <h4>comments</h4>
      <input type='text' value={comment} onChange={(e) => setComment(e.target.value)}></input>
      <button onClick={() => {handleComment(comment,blog.id);setComment('')}}>add comment</button>
      <ul>
        {blog.comments?blog.comments.map((el,i) => <li key={i}>{el}</li>):null}
      </ul>
    </div>
  )
}

export default BlogInfo