// Initial State
const initialState = {
    units: [],
    unit: []
}


// Action Types
const GET_ALL_UNITS = 'GET_ALL_UNITS'
const GET_UNIT = 'GET_UNIT'


// Action Builders
export function getAllUnits(units){
    return{
        type: GET_ALL_UNITS,
        payload: units
    }
}

export function getUnit(unit){
    return{
        type: GET_UNIT,
        payload: unit
    }
}


// Reducer
export default function glossaryReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_UNITS:
            return {...state, units: action.payload}
        case GET_UNIT:
            return {...state, unit: action.payload}
        default:
            return {...state}
    }
}

