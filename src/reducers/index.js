import modelReducer from "./modelReducer"
import datasetReducer from "./datasetReducer"
import sectionReducer from "./sectionReducer"
import loaderReducer from "./loaderReducer"
import updateResReducer from "./updateResReducer"
import {combineReducers} from "redux"

const allReducers = combineReducers({
    model: modelReducer,
    data: datasetReducer,
    section: sectionReducer,
    loaderActive: loaderReducer,
    updateResult: updateResReducer
})

export default allReducers