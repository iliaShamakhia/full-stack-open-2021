import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ success,message }) => {
  if (message === null) {
    return null
  }
  if(success){
    return (
      <Alert variant="success">
        {message}
      </Alert>
    )
  }else{
    return(
      <Alert variant="danger">
        {message}
      </Alert>
    )
  }
}

export default Notification