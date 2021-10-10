import React from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm =({ handleLogin,username,setUsername,password,setPassword }) => {
  return(
    <div>
      <h2 id="login-text" >Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
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
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm

/*<div>
            username <input id='username' type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
            password <input id='password' type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button id='login-button' type="submit">login</button> */