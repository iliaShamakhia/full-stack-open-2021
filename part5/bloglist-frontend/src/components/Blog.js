import React, { useState } from 'react'

const Blog = ({ blog,handleLike,handleRemove,user, i }) => {
  const [detailedView,setDetailedView]=useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if(detailedView){
    return(
      <div style={blogStyle} className={'blog-'+i}>
        <div>{blog.title} {blog.author} <button className='view-hide-button' onClick={() => setDetailedView(!detailedView)}>{detailedView?'hide':'view'}</button></div>
        <div>{blog.url}</div>
        <div className='likes'>Likes {blog.likes}<button className='like-button' onClick={() => handleLike(blog)}>like</button></div>
        <div>{blog.user.name}</div>
        {user.name===blog.user.name?<button className='remove-button' onClick={() => handleRemove(blog.title,blog.author,blog.id)}>remove</button>:''}
      </div>
    )
  }else{
    return (
      <div style={blogStyle} className='blog'>
        <div>{blog.title} {blog.author} <button className={'view-hide-button-'+i} onClick={() => setDetailedView(!detailedView)}>{detailedView?'hide':'view'}</button></div>
      </div>
    )
  }
}

export default Blog