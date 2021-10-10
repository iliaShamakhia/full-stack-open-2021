import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const UserInfo = ({ users }) => {
  const id = useParams().id
  const user = users.find(usr => usr.id === id)
  if (!user) {
    return null
  }
  return(
    <div>
      <h2>{user.name}</h2>
      <p><strong>added blogs</strong></p>
      <ListGroup variant='flush'>
        {user.blogs.map(bl => <ListGroup.Item variant='secondary' key={bl.id}><Link to={`/blogs/${bl.id}`}>{bl.title}</Link></ListGroup.Item>)}
      </ListGroup>
    </div>
  )
}

export default UserInfo