import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {changeModel} from "../actions"


const model_values = ['Logistic Regression']

const VisualModelNew = () => {
    const model = useSelector(state => state.model)
    const dispatch = useDispatch()

    return(
        <div className='visual-dataset visual-model-new'>
            <ul>
                {model_values.map((values, i) => 
                    <li key={i+1} style={{width: 'auto'}}> 
                        <input type='radio' name ='model' value={values} onClick={() => dispatch(changeModel(i))} checked={ model === i} />
                        <label htmlFor={values} style={{marginLeft: '8px', marginBottom: '0px', width: '200px'}}> 
                    {values} </label> </li>
                )}
            </ul>
        </div>
    )
}

export default VisualModelNew