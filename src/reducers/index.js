import modelReducer from "./modelReducer"
import datasetReducer from "./datasetReducer"
import sectionReducer from "./sectionReducer"
import loaderReducer from "./loaderReducer"
import {combineReducers} from "redux"

const allReducers = combineReducers({
    model: modelReducer,
    data: datasetReducer,
    section: sectionReducer,
    loaderActive: loaderReducer
})

export default allReducers