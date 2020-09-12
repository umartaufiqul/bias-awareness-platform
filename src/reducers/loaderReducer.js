const loaderReducer = (state='d-none', action) => {
    switch(action.type) {
        case "LOADER_ACTIVE":
            return ""
        case "LOADER_DEACTIVE":
            return "d-none"
        default:
            return state
    }
}

export default loaderReducer