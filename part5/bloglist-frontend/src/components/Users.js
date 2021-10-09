import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return(
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><strong>blogs created</strong></td>
          </tr>
        </tbody>
        {users.map(usr =>
          <tbody key={usr.id}>
            <tr>
              <td><Link to={`/users/${usr.id}`}>{usr.name}</Link></td>
              <td>{usr.blogs.length}</td>
            </tr>
          </tbody>
        )
        }
      </table>
    </div>
  )
}

export default Users