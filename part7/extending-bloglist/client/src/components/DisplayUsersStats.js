import React from 'react'
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'

const DisplayUserStats = ({ users }) => {
  if (!users) {
    return null
  }
  return (
    <div>
      <h2>Users</h2>
      <Table>
          <thead>
            <tr>
              <th scope="col"> </th>
              <th scope="col"> blogs created</th>
            </tr>
          </thead>
          <tbody>
          {users.map(user => 
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>            
          )}
          </tbody>
        </Table>
    </div>
  )
}


export default DisplayUserStats