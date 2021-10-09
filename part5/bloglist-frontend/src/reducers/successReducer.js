const successReducer = (state=null, action) => {
  switch(action.type){
  case 'SET_SUCCESS':
    state = true
    return state
  case 'SET_FAILURE':
    state = false
    return state
  default:
    return state
  }
}

export const setSuccess = () => {
  return {
    type: 'SET_SUCCESS'
  }
}

export const setFailure = () => {
  return {
    type:'SET_FAILURE'
  }
}

export default successReducer