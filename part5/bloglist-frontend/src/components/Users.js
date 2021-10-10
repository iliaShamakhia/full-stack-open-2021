import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
  return(
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td><strong>user</strong></td>
            <td><strong>blogs created</strong></td>
          </tr>
          {users.map(usr =>
            <tr key={usr.id}>
              <td><Link to={`/users/${usr.id}`}>{usr.name}</Link></td>
              <td>{usr.blogs.length}</td>
            </tr>
          )
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Users