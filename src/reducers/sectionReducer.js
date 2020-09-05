const sectionReducer = (state = 1, action) => {
    switch(action.type) {
        case 'NEXT_SECTION':
            return state + 1
        case 'PREV_SECTION':
            return state - 1
        default:
            return state
    }
}

export default sectionReducer