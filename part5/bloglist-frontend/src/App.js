import React, { useState, useEffect, useRef } from 'react'
//import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
//import BlogForm from './components/BlogForm'
//import Togglable from './components/Togglable'
//
import userService from './services/users'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Header from './components/Header'
import Users from './components/Users'
//
import { setNotification, removeNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setSuccess, setFailure } from './reducers/successReducer'
import { setBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/usersReducer'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'
import Blogs from './components/Blogs'
import { Navbar, Nav, Button } from 'react-bootstrap'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  //
  const [users, setUsers] = useState([])
  //
  const dispatch = useDispatch()
  const errorMessage = useSelector(state => state.notification)
  const success = useSelector(state => state.success)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      blogService.getAll().then(blogs => {
        dispatch(setBlogs( blogs ))
      }
      )
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    if(username===''||password===''){
      dispatch(setFailure())
      dispatch(setNotification('username & password must not be empty'))
      setTimeout(() => {dispatch(removeNotification())}, 5000)
      return
    }
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(setSuccess())
      dispatch(setNotification('Log in success'))
      setTimeout(() => {dispatch(removeNotification())}, 5000)
      blogService.getAll().then(blogs =>
        dispatch(setBlogs( blogs ))
      )
      userService.getUsers().then(res => setUsers(res))
    } catch (exception) {
      dispatch(setFailure())
      dispatch(setNotification('wrong username or password'))
      setTimeout(() => {dispatch(removeNotification())}, 5000)
    }
  }

  const handleLogout=() => {
    window.localStorage.clear()
    dispatch(setUser(null))
    dispatch(setSuccess())
    dispatch(setNotification('Log out success'))
    setTimeout(() => {dispatch(removeNotification())}, 5000)
  }

  const handleCreate=async (obj) => {
    if(!obj.title||!obj.author||!obj.url){
      dispatch(setFailure())
      dispatch(setNotification('Please fill in all required fields'))
      setTimeout(() => {dispatch(removeNotification())}, 5000)
      return
    }else{
      blogFormRef.current.toggleVisibility()
      await blogService.create(obj)
      blogService.getAll().then(blogs =>
        dispatch(setBlogs( blogs ))
      )
      dispatch(setSuccess())
      dispatch(setNotification(`a new blog ${obj.title} by ${obj.author} added`))
      setTimeout(() => {dispatch(removeNotification())}, 5000)
    }
  }

  const handleLike=async (obj) => {
    obj.likes=obj.likes+1
    obj.user=obj.user.id
    await blogService.update(obj)
    blogService.getAll().then(blogs =>
      dispatch(setBlogs( blogs ))
    )
  }

  const handleRemove=async(title,author,id) => {
    if(window.confirm(`Remove blog ${title} by ${author}?`)){
      await blogService.remove(id)
      blogService.getAll().then(blogs =>
        dispatch(setBlogs( blogs ))
      )
    }
  }

  const handleComment = async (comment,id) => {
    await blogService.addComment(comment,id)
    blogService.getAll().then(blogs =>
      dispatch(setBlogs( blogs ))
    )
  }

  if (user === null) {
    return (
      <div>
        <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
        <Notification  success={success} message={errorMessage} />
      </div>
    )
  }else{
    return (
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto test">
              <Nav.Link href="#" as="span">
                <Link to="/blogs">blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/users">users</Link>
              </Nav.Link>
              <Nav.Link id='logged-in-user'href="#" as="span">
                <p>{user.name} Logged in</p>
              </Nav.Link>
              <Button id='logout-button' variant='primary' onClick={handleLogout}>logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Header success={success} errorMessage={errorMessage} />
        <Switch>
          <Route path="/users/:id">
            <UserInfo users={users} />
          </Route>
          <Route path="/blogs/:id">
            <BlogInfo blogs={blogs} handleLike={handleLike} handleComment={handleComment}/>
          </Route>
          <Route path='/blogs'>
            <Blogs blogFormRef={blogFormRef} handleCreate={handleCreate} blogs={blogs} handleLike={handleLike} handleRemove={handleRemove} user={user}/>
          </Route>
          <Route path='/users'>
            <Users users={users}/>
          </Route>
          <Route path='/'>
            <Blogs blogFormRef={blogFormRef} handleCreate={handleCreate} blogs={blogs} handleLike={handleLike} handleRemove={handleRemove} user={user}/>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App

/*<div className='blogs'>
              <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <BlogForm handleCreate={handleCreate}/>
              </Togglable>
              {blogs.sort((a,b) => b.likes-a.likes).map((blog,i) =>
                <Blog key={blog.id} blog={blog} i={i} handleLike={handleLike} handleRemove={handleRemove} user={user}/>
              )}
            </div>
            <div className='navBar'>
          <p><Link  to="/blogs">blogs </Link></p>
          <p><Link  to="/users"> users</Link></p>
          <p>{user.name} Logged in <button id='logout-button' onClick={handleLogout}>logout</button></p>
        </div>
            */