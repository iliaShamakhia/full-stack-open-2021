import React, { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage,setErrorMessage]=useState(null)
  const [user, setUser] = useState(null)
  const [success,setSuccess]=useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    if(username===''||password===''){
      setSuccess(false)
      setErrorMessage('username & password must not be empty')
      setTimeout(() => {setErrorMessage(null)}, 5000)
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
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccess(true)
      setErrorMessage('Log in success')
      setTimeout(() => {setErrorMessage(null)}, 5000)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    } catch (exception) {
      setSuccess(false)
      setErrorMessage('wrong username or password')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  const handleLogout=() => {
    window.localStorage.clear()
    setUser(null)
    setSuccess(true)
    setErrorMessage('Log out success')
    setTimeout(() => {setErrorMessage(null)}, 5000)
  }

  const handleCreate=async (obj) => {
    if(!obj.title||!obj.author||!obj.url){
      setSuccess(false)
      setErrorMessage('Please fill in all required fields')
      setTimeout(() => {setErrorMessage(null)}, 5000)
      return
    }else{
      blogFormRef.current.toggleVisibility()
      await blogService.create(obj)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
      setSuccess(true)
      setErrorMessage(`a new blog ${obj.title} by ${obj.author} added`)
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  const handleLike=async (obj) => {
    obj.likes=obj.likes+1
    obj.user=obj.user.id
    await blogService.update(obj)
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }

  const handleRemove=async(title,author,id) => {
    if(window.confirm(`Remove blog ${title} by ${author}?`)){
      await blogService.remove(id)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification  success={success} message={errorMessage} />
        <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
      </div>
    )
  }else{
    return (
      <div className='blogs'>
        <h2>blogs</h2>
        <Notification  success={success} message={errorMessage} />
        <p>{user.name} Logged in <button id='logout-button' onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm handleCreate={handleCreate}/>
        </Togglable>
        {blogs.sort((a,b) => b.likes-a.likes).map((blog,i) =>
          <Blog key={blog.id} blog={blog} i={i} handleLike={handleLike} handleRemove={handleRemove} user={user}/>
        )}
      </div>
    )
  }
}

export default App