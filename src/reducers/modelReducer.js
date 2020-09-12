const modelReducer = (state = 0, action) => {
    switch(action.type) {
        case 'CHANGE_MODEL': 
            return action.model;
        default:
            return state;
    }
}

export default modelReducer