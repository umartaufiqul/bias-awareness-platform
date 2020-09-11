import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {changeDataset} from "../actions"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

const data_values = ['data1', 'data2', 'data3']
const data_specs = [
    {
        title: "A Benchmark Dataset for Learning to Intervene in Online Hate Speech",
        author: "Jing Qian et al.",
        tweet_num: 5000,
        categories: 2,
        abuse_rate: 0.8,
    }
]

const VisualDataset = () => {
    const data = useSelector(state => state.data)
    const dispatch = useDispatch()

    return(
        <div className='visual-dataset'>
            <ul>
                {data_values.map((values, i) => 
                        <li key={i+1}> <input type='radio' name ='dataset' value={values} onClick={() => dispatch(changeDataset(i))} checked={ data === i}/> 
                            <label htmlFor={values} style={{marginLeft: '8px', marginBottom: '0px'}}> Data {i+1} </label>
                            <OverlayTrigger
                            key={'right'}
                            placement={'right'}
                            overlay={
                                <Tooltip id={`tooltip-${'right'}`} className='text-align-left'>
                                    Title : {data_specs[0].title} <br />
                                    Author : {data_specs[0].author} <br />
                                    Number of Tweets : {data_specs[0].tweet_num} <br />
                                    Categories: {data_specs[0].categories} <br />
                                    Abuse rate: {data_specs[0].abuse_rate}
                                </Tooltip>
                            }
                            >
                            <img src={require('../icons/info.svg')} alt='' className='info-icon'/>
                            </OverlayTrigger>
                        </li>
                    )}
            </ul>
        </div>
    )
}

export default VisualDataset