import React, { useEffect } from "react"
import {useSelector, useDispatch} from "react-redux"
import {changeDataset} from "../actions"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

const data_values = ['Data 1 (Davidson et al.)', 'Data 2 (Founta et al.)']
const data_specs = [
    {
        title: "Automated Hate Speech Detection and the Problem of Offensive Language",
        author: "Davidson et al.",
        tweet_num: 25297,
        categories: 3,
    }, 
    {
        title: "Large Scale Crowdsourcing and Characterization of Twitter Abusive Behavior",
        author: "Founta et al.",
        tweet_num: 20000,
        categories: 2,
    }
]

const VisualDataset = (props) => {
    const data = useSelector(state => state.data)
    const dispatch = useDispatch()

    useEffect(d => {
         props.onChange(data);
    }, [data]);

    return(
        <div className='visual-dataset'>
            <ul>
                {data_values.map((values, i) => 
                        <li key={i+1} style={{width: "auto"}}> <input type='radio' name ='dataset' value={values} onClick={() => dispatch(changeDataset(i))} checked={ data === i}/> 
                            <label htmlFor={values} style={{marginLeft: '8px', marginBottom: '0px'}}> {data_values[i]} </label>
                            <OverlayTrigger
                            key={'right'}
                            placement={'right'}
                            overlay={
                                <Tooltip id={`tooltip-${'right'}`} className='text-align-left'>
                                    Title : {data_specs[i].title} <br />
                                    Author : {data_specs[i].author} <br />
                                    Number of Tweets : {data_specs[i].tweet_num} <br />
                                    Categories: {data_specs[i].categories} <br />
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