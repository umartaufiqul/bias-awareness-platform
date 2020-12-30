const updateResReducer = (state = false, action) => {
    switch(action.type) {
        case "UPDATE_RESULT":
            return true;
        case "UPDATE_FINISH":
            return false;
        default:
            return state;
    }
}

export default updateResReducer;