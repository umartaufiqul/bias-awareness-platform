import React, {useRef, useState} from "react"
import "../style/Mitigation.css"
import {useDispatch, useSelector} from "react-redux"
import Modal from "react-bootstrap/Modal"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import Form from "react-bootstrap/Form"
import { activateLoader, deactivateLoader } from "../actions"

const MitigationNew = () => {

    const hiddenFileInput = useRef(null)
    const modelChoice = ['Model 1', 'Model 2', 'Model 3']
    const [fileName, setFileName] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [chosenModel, setChosenModel] = useState("Choose a model...")
    const [compareModel, setCompareModel] = useState({compare: "d-none", choice: ""})
    const [buttonTitle, setButtonTitle] = useState("Compare")
    const [studentId, setStudentId] = useState("")
    const [studentEmail, setStudentEmail] = useState("")
    // const [loaderActive, setLoaderActive] = useState("d-none")

    const loaderActive = useSelector(state => state.loaderActive)

    const dispatch = useDispatch()

    const resultStat = [{
        class: "Racism",
        pblack: 0.001,
        pwhite: 0.003,
        pblack_white: 0.005
    }, {
        class: "Sexism",
        pblack: 0.083,
        pwhite: 0.048,
        pblack_white: 1.724
    }]

    const otherStat = [
        [{
            class: "Racism",
            pblack: 0.001,
            pwhite: 0.003,
            pblack_white: 0.005
        }, {
            class: "Sexism",
            pblack: 0.083,
            pwhite: 0.048,
            pblack_white: 1.724
        }], [{
            class: "Racism",
            pblack: 0.001,
            pwhite: 0.003,
            pblack_white: 0.095
        }, {
            class: "Sexism",
            pblack: 0.083,
            pwhite: 0.048,
            pblack_white: 1.724
        }], [{
            class: "Racism",
            pblack: 0.001,
            pwhite: 0.031,
            pblack_white: 0.005
        }, {
            class: "Sexism",
            pblack: 0.083,
            pwhite: 0.048,
            pblack_white: 1.724
        }], 
    ]

    function onChangeHandler(event) {
        console.log(event.target.files[0])
        setFileName(event.target.files[0].name)
    }

    function handleClick(event) {
        hiddenFileInput.current.click()
    }

    function handleChooseModel(index) {
        setChosenModel(modelChoice[index])
    }

    function handleCompare() {
        if (buttonTitle === "Compare") {
            setCompareModel({
                compare: "",
                choice: "d-none"
            })
            setButtonTitle("Change Comparison")
        }
        else {
            setCompareModel({
                compare: "d-none",
                choice: ""
            })
            setButtonTitle("Compare")
        }
    }

    const getIndexEq = (value) => {
        if (chosenModel === "Choose a model...") {
            return value === "Model 1"
        }
        return value === chosenModel 
    }

    function handleInputChange(e, id) {
        if (id === "student-id") {
            setStudentId(e.target.value)
        }
        else {
            setStudentEmail(e.target.value)
        }
    }

    function handleSubmit() {
        dispatch(activateLoader())
        const return_data = {
            email: studentEmail,
            id: studentId,
            file: fileName
        }
        console.log(return_data)
        setTimeout(function(){
            dispatch(deactivateLoader())
            alert("Your model has been submitted")
        }, 5000)
        setStudentId("")
        setStudentEmail("")
        setFileName("")
    }

    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)

    const date = new Date()
    return(
        <div className='mitigation-new'>
            {/* <div className={'loader-bg'}></div>
            <div className={'signin-popup'}>

            </div> */}
            <div className={'loader-bg '+loaderActive}>

            </div>
            <div className={'loader text-center '+loaderActive}>
                <h3> Please wait a moment </h3>
                <p style={{marginTop: "1rem"}}> Your work is currently being submitted.</p>
                <div className='spinner'></div>
            </div>
            <div className='submit-mitigation text-center'>
                <h3> Submit your mitigation algorithm! </h3>
                <form className=' justify-content-center' style={{marginTop: "2rem"}}>
                    <Row className='form-part'>
                        <Col md={8} className='align-item-center'>
                            <input type="text" className='form-control' value={fileName} readOnly/>
                        </Col>
                        <Col md={4}>
                             <button onClick={handleClick} className='btn btn-green'> Upload a file </button>
                        </Col>
                    </Row>
                    <Form.Group as={Row} className='form-part'>
                        <Form.Label column sm="2">
                        Student ID
                        </Form.Label>
                        <Col sm="3">
                        <input type="text" className='form-control' value={studentId} onChange={(e) => handleInputChange(e, "student-id")}/>
                        </Col>
                        <Form.Label column sm="2">
                        Email
                        </Form.Label>
                        <Col sm="5">
                        <input type="text" className='form-control' value={studentEmail} onChange={(e) => handleInputChange(e, "email")}/>
                        </Col>
                    </Form.Group>
                    <button className='btn btn-green' style={{marginTop: "1rem"}} onClick={handleSubmit}> Submit </button>
                </form>
                <input type="file" name="file" onChange={onChangeHandler} ref={hiddenFileInput} style={{display: 'none'}}/>
            </div>
            <div className='submit-history'>
                <h5> History </h5>
                <table>
                    <thead>
                        <tr>
                            <th className='id-col'>ID</th>
                            <th>INPUT</th>
                            <th>SUBMITTED AT</th>
                            <th>RESULT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='id-col'> 1 </th>
                            <td> bias_mitigation.ipynb</td>
                            <td> {date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours()+':' + date.getMinutes()} </td>
                            <td> <button className='btn btn-secondary' onClick={handleShow}> Show </button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Modal show={showModal} onHide={handleClose} className='mw-75'>
                <Modal.Header closeButton>
                    <Modal.Title> Result </Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <h5> Your result after debiasing</h5>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope="col">Class</th>
                                <th scope="col">Pblack</th>
                                <th scope="col">Pwhite</th>
                                <th scope="col">Pblack/Pwhite</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultStat.map((item, i) => 
                                <tr key={i}>
                                    <th scope="row"> {item.class}</th>
                                    <td> {item.pblack} </td>
                                    <td> {item.pwhite} </td>
                                    <td> {item.pblack_white} </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Row className={compareModel.choice}>
                        <Col className='d-flex align-items-center justify-content-end'> <h6> Compare with a model: </h6></Col>
                        <Col className='d-flex align-items-center justify-content-start'> 
                            <DropdownButton id="dropdown-basic-button" title={chosenModel}>
                                {modelChoice.map((item, i) => 
                                    <Dropdown.Item key={i} onClick={() => handleChooseModel(i)}>
                                        {item}
                                    </Dropdown.Item>
                                )}
                            </DropdownButton>
                        </Col>
                    </Row>
                    <div className={'compare-model '+ compareModel.compare}>
                        <h5> {chosenModel} without debiasing </h5>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope="col">Class</th>
                                    <th scope="col">Pblack</th>
                                    <th scope="col">Pwhite</th>
                                    <th scope="col">Pblack/Pwhite</th>
                                </tr>
                            </thead>
                            <tbody>
                                {otherStat[modelChoice.findIndex(getIndexEq)].map((item, i) => 
                                    <tr key={i}>
                                        <th scope="row"> {item.class}</th>
                                        <td> {item.pblack} </td>
                                        <td> {item.pwhite} </td>
                                        <td> {item.pblack_white} </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-secondary' onClick={handleClose}>
                        Close
                    </button>
                    <button className='btn btn-primary' onClick={handleCompare}>
                        {buttonTitle}
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MitigationNew