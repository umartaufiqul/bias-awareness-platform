import React from "react"
import Button from "../components/Button"
import {Col, Row} from "react-bootstrap"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"

function Introduction() {
    return(
        <div className="App">
        <Navbar className='intro-navbar'>
            <Navbar.Brand id="intro-span">Bias Awareness Platform</Navbar.Brand>
        </Navbar>
            <div className="introduction-page">
                <h1 className="text-center"> Activity 1. Bias in Hate Speech Detection </h1>
                {/* <p> In this activity, a member of high school board would like to have a feedback about their school facility and faculty. However, following the school policy, the board doesn't want to include feedbacks that include toxic or abusive words. On the other hand, the school board is concerned that some of the underrepresented group of student can be unnecessarily filtered out</p>
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
                 */}
                <p> Hate speech detection is commonly used in social media context, such as facebook and twitter, in order to filter out post that are deemed hateful or abusive. However, many papers pointed out that hate speech detection technology, such as perspective API, are biased toward flagging more tweets that use AAE (African-American English) dialect. </p>
                <p> In this activity, you will be able to explore and interactive platform where you can combine several different models with dataset, and observe how some combinations may affect the fairness of the of model </p>
                <p> You will also need to submit a model suspected of being biased that you have mitigate the bias with a debiasing technique, and see how it compare with the original model</p> 
                <div className="text-center">
                    <button className='btn btn-green start-btn'> <a href='/bias-awareness-platform/#/visualization'>Start Activity </a></button>
                </div>
            </div>
        </div>
    )
}

export default Introduction