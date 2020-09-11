const sectionReducer = (state = 1, action) => {
    switch(action.type) {
        case 'NEXT_SECTION':
            return state + 1
        case 'PREV_SECTION':
            return state - 1
        case 'SET_SECTION':
            return action.section
        default:
            return state
    }
}

export default sectionReducer