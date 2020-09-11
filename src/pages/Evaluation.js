import React, {useState} from "react"
import "../style/Evaluation.css"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

const Evaluation = () => {
    
    const [studentId, setStudentId] = useState("")
    const [studentEmail, setStudentEmail] = useState("")

    function handleInputChange(e, id) {
        if (id === "student-id") {
            setStudentId(e.target.value)
        }
        else {
            setStudentEmail(e.target.value)
        }
    }

    return(
        <div className="evaluation">
            <div className="evaluation-inner">
            <div className="text-center evaluation-title">
            <h3> Evaluation and Questions </h3>
            </div>
            <p> After building the model and see the visualization of the result, here are some questions that you need to answer. In case you need to see the visualization again, you can click the result button on the right corner </p> 
            <form>
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
                <div className='question-group'>
                <label> 1. Based on the visualization and the result, do you find any noteworthy finding? What do you think cause this? </label>
                <textarea />
                </div>
                <div className='question-group'>
                <label> 2. Once you try several other datasets, did you notice any different between datasets? What do you think cause this? </label>
                <textarea />
                </div>
                <div className='question-group'>
                <label> 3. Which dataset do you think is better out of the ones that you try? Why do you think so? </label>
                <textarea />
                </div>
                <div className='question-group'>
                <label> 4. From the definitions of the metrics that are shown in the "model" tab, which one do you think is the fairest for both groups? Why?  </label>
                <textarea />
                </div>
                <div className='question-group'>
                <label> 5. Try and change the metrics several times. Did you notice any changes? (e.g in term of distribution and accuracy) </label>
                <textarea />
                </div>
                <div className='question-group'>
                <label> 6. Now that you've tried several metrics, which one do you think is the fairest for both groups? Why? </label>
                <textarea />
                </div>
            </form>
            <div className='text-center submit-btn'>
                <button className='btn btn-green'> Submit </button>
            </div>
            </div>
        </div>
    )

}

export default Evaluation