import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
      <ul>
        {user.blogs.map(bl => <li key={bl.id}><Link to={`/blogs/${bl.id}`}>{bl.title}</Link></li>)}
      </ul>
    </div>
  )
}

export default UserInfo