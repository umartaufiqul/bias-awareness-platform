// Change the model into the chosen one
export const changeModel = (index) => {
    return {
        type: "CHANGE_MODEL",
        model: index,
    }
}

// Change the dataset into the chosen one
export const changeDataset = (index) => {
    return {
        type: "CHANGE_DATA",
        dataset: index
    }
}

// Go to the next section
export const nextSection = () => {
    return {
        type: "NEXT_SECTION"
    }
}

// Go to the previous section
export const prevSection = () => {
    return {
        type: "PREV_SECTION"
    }
}

// Set the section into a given number
export const setSection = (id) => {
    return {
        type: "SET_SECTION",
        section: id
    }
}

// Activate the loader on the page
export const activateLoader = () => {
    return {
        type: "LOADER_ACTIVE"
    }
}

// Deactivate the loader
export const deactivateLoader = () => {
    return {
        type: "LOADER_DEACTIVE"
    }
}

// Update the result graph in the mitigation page
export const updateResult = (type, source) => {
    return {
        type,
        source
    }
}