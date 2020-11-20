import React, { useEffect, useState } from "react"
import {useSelector, useDispatch} from "react-redux"
import {changeDataset} from "../actions"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import {CSVReader} from 'react-papaparse'

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
    const buttonRef = React.createRef()
    const data = useSelector(state => state.data)
    const dispatch = useDispatch()
    const [customData, setCustomData] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [chosenColumn, setChosenColumn] = useState("Column list")
    const [chosenClass, setChosenClass] = useState("Column list")

    useEffect(d => {
         props.onChange(data);
    }, [data]);

    function createColumnOption(type) {
        if (customData !== "") {
            return customData[0].data.map((choice, i) => <Dropdown.Item key={i} onClick={() => changeColumn(i, type)}>{choice}</Dropdown.Item>)
        }
    }

    function changeColumn(index, type) {
        if (type === "tweet") {
            setChosenColumn(index)
        }
        else {
            setChosenClass(index)
        }
    }

    function handleOpenDialog(e) {
        // Note that the ref is set async, so it might be null at some point 
        if (buttonRef.current) {
            buttonRef.current.open(e)
        }
    }

    function handleCloseModal() {
        setShowModal(false)
        //Send the data upward to the data table
        props.passCustomData({
            tweet: chosenColumn,
            label: chosenClass,
            data: customData})
    }

    function handleOpenModal(data) {
        setCustomData(data)
        setShowModal(true)
    }
      
    function handleOnFileLoad(data){
        handleOpenModal(data)
        dispatch(changeDataset(-1))
    }
    
    function handleOnError(err, file, inputElem, reason){
        console.log(err)
    }
    
    function handleOnRemoveFile(data){
        console.log('---------------------------')
        console.log(data)
        console.log('---------------------------')
    }

    function handleRemoveFile(e){
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
          buttonRef.current.removeFile(e)
        }
    }

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
                <li style={{width: "auto"}}> 
                    <input type='radio' name ='dataset' checked={data == -1}/> 
                    <label style={{marginLeft: '8px', marginBottom: '0px'}}> Custom data </label>
                    {/* <button className='btn btn-secondary ml-4'> Upload</button> */}
                    {/* <input type='file' className='my-3' onChange={
                        (e) => {
                            dispatch(changeDataset(-1))
                            setCustomData(e.target.files[0].name)
                        }} style={{overflowX: "auto"}}></input> */}
                    <div className='text-center my-3'>
                        {/* <input type='submit' className='btn btn-green' onClick={() => props.passCustomData(customData)}></input> */}
                        <CSVReader
                            ref={buttonRef}
                            onFileLoad={handleOnFileLoad}
                            onError={handleOnError}
                            noClick
                            noDrag
                            onRemoveFile={handleOnRemoveFile}
                        >
                            {({ file }) => (
                            <aside
                                style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: 10
                                }}
                            >
                                <button
                                type='button'
                                onClick={handleOpenDialog}
                                className='btn btn-green'
                                >
                                Browse file
                                </button>
                                <div
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    borderColor: '#ccc',
                                    height: 45,
                                    lineHeight: 1.5,
                                    width: "60%",
                                    marginTop: 5,
                                    paddingTop: 10,
                                }}
                                >
                                {file && file.name}
                                </div>
                                <button
                                onClick={handleRemoveFile}
                                className='btn btn-danger'
                                >
                                Remove
                                </button>
                            </aside>
                            )}
                        </CSVReader>
                    </div>
                </li>
            </ul>
            
            <button className='btn btn-primary'> Update result </button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Dataset Setup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex align-items-center my-2'>
                        <span className='mr-3'>
                            Choose tweet column:
                        </span>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {typeof chosenColumn === 'number'? customData[0].data[chosenColumn] : chosenColumn }
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {createColumnOption("tweet")}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='d-flex align-items-center my-2'>
                        <span className='mr-3'>
                            Choose class column:
                        </span>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {typeof chosenClass === 'number'? customData[0].data[chosenClass] : chosenClass }
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {createColumnOption("class")}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleCloseModal}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default VisualDataset