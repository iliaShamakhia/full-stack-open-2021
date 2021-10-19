import React from 'react'
import { Form, Button } from 'react-bootstrap'
import RegistrationForm from './RegistrationForm'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'


const LoginForm =({ handleLogin,username,setUsername,password,setPassword,handleRegister }) => {

  return(
    <Router>
      <Switch>
        <Route path='/register'>
          <RegistrationForm handleRegister={handleRegister}/>
        </Route>
        <Route path='/'>
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
                <div id="login-register">
                  <Button id="login-button" variant="primary" type="submit">
                    login
                  </Button>
                  <div id='register-user-button'>
                    <Link to="/register">register</Link>
                  </div>
                </div>
              </Form.Group>
            </Form>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default LoginForm

/* */