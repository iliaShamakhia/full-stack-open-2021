let timeout;
const notificationReducer = (state = '', action) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            state = action.notification
            return state
        case 'REMOVE_NOTIFICATION':
            state = ''
            return state
        default:
            return state
    }
}
  
export const setNotification = (notification, time) => {
    return dispatch => {
        if(timeout)clearTimeout(timeout)
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })
        timeout = setTimeout(()=>{
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
        },time*1000)
    }
}
  
export default notificationReducer