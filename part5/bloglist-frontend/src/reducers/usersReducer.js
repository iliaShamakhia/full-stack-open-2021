const usersReducer = (state = null, action) => {
  switch(action.type){
  case 'SET_USER':
    state = action.user
    return state
  default:
    return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
}

export default usersReducer