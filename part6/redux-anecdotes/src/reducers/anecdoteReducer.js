import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type){
    case 'VOTE':
      return [...state].map(el=>{
        if(el.id===action.data.id){
          el.votes++
        }
        return el
      })
    case 'ADD_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: { id:anecdote.id }
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer