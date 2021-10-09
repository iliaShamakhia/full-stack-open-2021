const blogsReducer = (state=[], action) => {
  switch(action.type){
  case 'SET_BLOGS':
    state = action.blogs
    return state
  default:
    return state
  }
}

export const setBlogs = (blogs) => {
  return {
    type: 'SET_BLOGS',
    blogs
  }
}

export default blogsReducer