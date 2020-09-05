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