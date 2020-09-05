import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {changeDataset} from "../actions"

const data_values = ['data1', 'data2', 'data3']

const VisualDataset = () => {
    const data = useSelector(state => state.data)
    const dispatch = useDispatch()

    return(
        <div className='visual-dataset'>
            <ul>
                {data_values.map((values, i) => 
                        <li key={i+1}> <input type='radio' name ='dataset' value={values} onClick={() => dispatch(changeDataset(i))} checked={ data === i}/> Data {i+1} </li>
                    )}
            </ul>
        </div>
    )
}

export default VisualDataset