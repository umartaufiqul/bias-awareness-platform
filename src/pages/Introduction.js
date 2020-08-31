import React from "react"
import Button from "../components/Button"
import {Col, Row} from "react-bootstrap"

function Introduction() {
    return(
        <div className="App">
            <h1 className="text-center"> Activity 1. Bias in Hate Speech Detection </h1>
            <p> In this activity, a member of high school board would like to have a feedback about their school facility and faculty. However, following the school policy, the board doesn't want to include feedbacks that include toxic or abusive words. On the other hand, the school board is concerned that some of the underrepresented group of student can be unnecessarily filtered out</p>
            <Row className='text-center'>
                <Col md={{span: 3, offset: 2}}> 
                    <div className='comment-sample'> The school lunch is delicious, but I wish the portion could be more fulfilling </div> 
                    <div className='comment-label'> Acceptable comment </div>
                </Col>
                <Col md={{span: 3, offset: 2}}> 
                    <div className='comment-sample'> The school lunch sucks! </div> 
                    <div className='comment-label'> Unacceptable </div> 
                </Col>
            </Row>
            <p> Your task is to create a model that can automatically detect and remove such feedback, while taking the school board concern into consideration</p>
            <div className="text-center">
            <Button name="Start Activity" link='/bias-awareness-platform/#/code'/>
            </div>
        </div>
    )
}

export default Introduction