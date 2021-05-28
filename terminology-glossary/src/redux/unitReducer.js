// Initial State
const initialState = {
    unit:[]
}

// Action Types
const SET_UNIT = 'SET_UNIT'

// Action Builders
export function setUnit(unit){
    return {
        type: SET_UNIT, 
        payload: unit
    }
}

// Reducer

export default function unitReducer(state = initialState, action){
    switch(action.type){
        case setUnit:
            return {...state, unit: action.payload}
        default:
            return {...state}
    }
}
