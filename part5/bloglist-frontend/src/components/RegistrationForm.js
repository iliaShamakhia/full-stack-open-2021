import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'

const RegistrationForm = ({ handleRegister }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  return(
    <div>
      <h2 id="login-text" >Register</h2>
      <Form onSubmit={(e) => {
        e.preventDefault()
        handleRegister(name,username,password)
        history.push('/')
        setName('')
        setUsername('')
        setPassword('')
      }
      }>
        <Form.Group>
          <Form.Label>name:</Form.Label>
          <Form.Control
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button id="login-button" variant="primary" type="submit">
            register
          </Button>
          <Button id='cancel-regist-button' variant='danger' onClick={() => history.push('/')}>cancel</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default RegistrationForm