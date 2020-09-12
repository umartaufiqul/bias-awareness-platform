import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {changeModel} from "../actions"


const model_values = ['model1', 'model2', 'model3']

const VisualModelNew = () => {
    const model = useSelector(state => state.model)
    const dispatch = useDispatch()

    return(
        <div className='visual-dataset visual-model-new'>
            <ul>
                {model_values.map((values, i) => 
                    <li key={i+1}> <input type='radio' name ='model' value={values} onClick={() => dispatch(changeModel(i))} checked={ model === i}/> 
                    <label htmlFor={values} style={{marginLeft: '8px', marginBottom: '0px'}}> 
                    Model {i+1} </label> </li>
                )}
            </ul>
        </div>
    )
}

export default VisualModelNew