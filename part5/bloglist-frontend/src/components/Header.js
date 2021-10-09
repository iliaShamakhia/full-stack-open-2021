import React from 'react'
import Notification from './Notification'

const Header = ({ success, errorMessage }) => {
  return(
    <div>
      <h2>blog app</h2>
      <Notification  success={success} message={errorMessage} />
    </div>
  )
}

export default Header