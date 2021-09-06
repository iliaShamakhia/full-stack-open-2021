import React, { useState } from 'react'

const BlogForm =({ handleCreate }) => {
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')

  const addBlog=(event) => {
    event.preventDefault()
    let newBlog={
      title,
      author,
      url
    }
    handleCreate(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
            title:<input id='title' type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
            author:<input id='author' type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
            url:<input id='url' type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button id='submit-blog-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm