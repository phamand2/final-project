import axios from 'axios';

export const SET_ACCORDIONINDEX = 'SET_ACCORDIONINDEX'




export function setAccordionIndex(accordionIndex) {
    return {
        type: SET_ACCORDIONINDEX,
        payload: {
            accordionIndex
        }
    }
}



export const register = (name, pin) => async(dispatch) => {
    dispatch({ 
        type: 'USER_REGISTER_REQUEST',
        payload: { name, pin } })
        try {
            const {data} = await axios.post('/users/register', { name, pin })
            dispatch({type: 'USER_REGISTER_SUCCESS', payload: data})
            dispatch({type: 'USER_SIGNIN_SUCCESS', payload: data.user})
            localStorage.setItem("userInfo", JSON.stringify(data))
        } catch(error) {
            dispatch({ type: 'USER_REGISTER_FAIL',
                payload: error.response && error.response.data.message
                ? error.response.data.message 
                : error.message, 
            })
        }
}; 

export const signin = (id, pin) => async(dispatch) => {
    dispatch({ 
        type: 'USER_SIGNIN_REQUEST',
        payload: { id, pin } })
        try {
            const {data} = await axios.post('/users/login', { id, pin })
            dispatch({type: 'USER_SIGNIN_SUCCESS', payload: data.user})
            localStorage.setItem("userInfo", JSON.stringify(data))
        } catch(error) {
            dispatch({ type: 'USER_SIGNIN_FAIL',
                payload: error.response && error.response.data.error
                ? error.response.data.error 
                : error.message, 
            })
        }
}; 

export const signout = () => async(dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({
        type: 'USER_SIGNOUT'
    })
    try {
        const {data} = await axios.get('/users/logout')
        dispatch({type: 'USER_SIGNOUT'})
        localStorage.removeItem('userInfo', JSON.stringify(data))
    } catch(error) {
        console.log(error)
    }
}

export const checkAuth = () => async(dispatch) => {
    dispatch({ 
        type: 'USER_SIGNIN_REQUEST',})
        
        try {
            const {data} = await axios.get('/users/current')
            dispatch({type: 'USER_SIGNIN_SUCCESS', payload: data.user})
            localStorage.setItem("userInfo", JSON.stringify(data))
        } catch(error) {
            dispatch({ type: 'USER_SIGNIN_FAIL',
                payload: error.response && error.response.data.error
                ? error.response.data.error 
                : error.message, 
            })
        }
}