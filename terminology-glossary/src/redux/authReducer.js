

const initialState = {
    user: null
}

const SET_USER = 'SET_USER'
const CLEAR_USER = 'CLEAR_USER'

export function setUser(user){
    return{
        type: SET_USER,
        payload: user
    }
}

export function clearUser(){
    return{
        type: CLEAR_USER,
        payload: null
    }
}


export default function loginReducer(state = initialState, action){
    switch(action.type){
        case SET_USER:
            return {...state, user: action.payload}
        case CLEAR_USER:
            return {...state, user: null}
        default:
            return {...state}
    }
}