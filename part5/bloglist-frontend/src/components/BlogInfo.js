import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { ListGroup, Form, Button } from 'react-bootstrap'

const BlogInfo = ({ blogs, handleLike, handleComment, handleRemove, user }) => {
  const [comment, setComment] = useState('')
  const history = useHistory()
  const id = useParams().id
  const blog = blogs.find(bl => bl.id === id)
  if(!blog){
    return null
  }
  return(
    <div>
      <h2>{blog.title}</h2>
      <p>by: {blog.author}</p>
      <p>for more info visit: <a href={blog.url}>{blog.url}</a></p>
      <p>likes: {blog.likes} <Button id='like-button' variant='primary' onClick={() => handleLike(blog)}>like</Button></p>
      { user.username===blog.user.username?
        <Button id='blog-remove-button' variant='danger' onClick={() => { handleRemove(blog.title,blog.author,blog.id);history.push('/blogs')}}>remove</Button>
        :null
      }
      <h4>comments</h4>
      <ListGroup variant='flush'>
        {blog.comments?blog.comments.map((el,i) => <ListGroup.Item variant='secondary' key={i}>{el}</ListGroup.Item>):null}
      </ListGroup>
      <Form onSubmit={(e) => {e.preventDefault();handleComment(comment,blog.id);setComment('')}}>
        <Form.Group>
          <Form.Control
            id="comment"
            type="text"
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button id="comment-button" variant="primary" type="submit">
            add comment
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogInfo