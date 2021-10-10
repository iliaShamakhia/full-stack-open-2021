import React from 'react'
import Notification from './Notification'

const Header = ({ success, errorMessage }) => {
  return(
    <div>
      <Notification  success={success} message={errorMessage} />
      <h2 id='blog-app'>blog app</h2>
    </div>
  )
}

export default Header