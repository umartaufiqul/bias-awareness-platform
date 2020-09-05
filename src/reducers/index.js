import modelReducer from "./modelReducer"
import datasetReducer from "./datasetReducer"
import sectionReducer from "./sectionReducer"
import {combineReducers} from "redux"

const allReducers = combineReducers({
    model: modelReducer,
    data: datasetReducer,
    section: sectionReducer,
})

export default allReducers