const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_SEARCH':
            return action.payload
        default:
            return state
    }

   
}

export const setFilter= search => {
    return {
        type: 'SET_SEARCH',
        payload: search
    }
}

export default filterReducer



