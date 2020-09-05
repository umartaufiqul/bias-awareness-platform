const datasetReducer = (state = 0, action) => {
    switch(action.type) {
        case 'CHANGE_DATA': 
            return action.dataset;
        default:
            return state;
    }
}

export default datasetReducer