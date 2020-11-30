export const changeModel = (index) => {
    return {
        type: "CHANGE_MODEL",
        model: index,
    }
}

export const changeDataset = (index) => {
    return {
        type: "CHANGE_DATA",
        dataset: index
    }
}

export const nextSection = () => {
    return {
        type: "NEXT_SECTION"
    }
}

export const prevSection = () => {
    return {
        type: "PREV_SECTION"
    }
}

export const setSection = (id) => {
    return {
        type: "SET_SECTION",
        section: id
    }
}

export const activateLoader = () => {
    return {
        type: "LOADER_ACTIVE"
    }
}

export const deactivateLoader = () => {
    return {
        type: "LOADER_DEACTIVE"
    }
}

export const updateResult = (type, source) => {
    return {
        type,
        source
    }
}