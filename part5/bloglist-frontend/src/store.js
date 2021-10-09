import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import successReducer from './reducers/successReducer'
import blogsReducer from './reducers/blogsReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  success: successReducer,
  user: usersReducer
})

const store = createStore(reducer)

export default store