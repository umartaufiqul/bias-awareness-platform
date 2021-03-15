import React, {useState} from "react"
import Button from "../components/Button"
import {Col, Row} from "react-bootstrap"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import Tour from "reactour"
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock"

function Introduction() {
    const [isTourOpen, setIsTourOpen] = useState(false)

    const help = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='white'><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.25 17c0 .69-.559 1.25-1.25 1.25-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25zm1.393-9.998c-.608-.616-1.515-.955-2.551-.955-2.18 0-3.59 1.55-3.59 3.95h2.011c0-1.486.829-2.013 1.538-2.013.634 0 1.307.421 1.364 1.226.062.847-.39 1.277-.962 1.821-1.412 1.343-1.438 1.993-1.432 3.468h2.005c-.013-.664.03-1.203.935-2.178.677-.73 1.519-1.638 1.536-3.022.011-.924-.284-1.719-.854-2.297z"/></svg>

    const intro_help = [
        {
            selector: '',
            content: () => (
                <div>
                    <h3 className='text-center'> Tutorial and Help </h3>
                    <p> In each page, you will see this button. You can click it anytime if you confused or need some guide around the platform. </p> 
                    <p> Have fun exploring the platform! </p>
                </div>
            )
        }
    ]

    function closeTour() {
        setIsTourOpen(false)
    };
    
    function openTour(){
        setIsTourOpen(true)
    }

    function disableBody(target) {disableBodyScroll(target)};
    function enableBody(target) {enableBodyScroll(target)}; 

    return(
        <div className="App">
        <Navbar className='intro-navbar'>
            <Navbar.Brand id="intro-span">Assignment 1.</Navbar.Brand>
            <div className='tutorial-button'>
            <OverlayTrigger
            key={'left'}
            placement={'left'}
            overlay={
                <Tooltip id={`tooltip-${'left'}`}>
                Click here for help
                </Tooltip>
            }
            >
                <div style={{cursor: "pointer"}} onClick={openTour}>
                    {help}
                </div>
            </OverlayTrigger>
            </div>
        </Navbar>
            <div className="introduction-page">
                <h1 className="text-center"> <b>Assignment 1. Bias in Abusive Language Detection</b><br />  (Due: Mar 30. 11:59PM)</h1>
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
	<h3> Learning Objectives </h3>

		<p>Measuring and mitigating bias caused by AI is a central topic in Human-AI Interaction. The objective of this assignment is for you to explore possible ways of measuring and mitigating such bias through real-life datasets and examples, think about various design decisions made along the way, and discuss the social impact of AI bias. </p>

	<h3> Background </h3>

	<p> Abusive language detection is commonly used for content moderation in social media (e.g., Facebook and Twitter) and online communities (e.g., Reddit) to automatically identify and filter out content that is deemed abusive. However, many papers pointed out that technology for detecting toxic language, such as <a href='https://www.perspectiveapi.com/'>Google’s Perspective API</a>, presents biased results toward flagging more content written in AAE (African-American English) dialect than content in SAE (Standard American English). </p>

	<h3> What should I do?</h3>

	<p> In this assignment, you are asked to (1) explore the datasets, (2) implement how to measure a bias, and (3) attempt to mitigate the bias. We provide three datasets, each of which consists of 20,000+ tweets. You are going to train a simple machine learning model called <a href='https://en.wikipedia.org/wiki/Logistic_regression#:~:text=Logistic%20regression%20is%20a%20statistical,a%20form%20of%20binary%20regression).'>Logistic Regression</a> to classify whether a tweet contains hateful language, abusive language, or no toxic language. With the trained model, you will check whether the model gives a biased prediction with respect to the two dialects (AAE and SAE) using a different tweet dataset, which has not been used in the training phase. </p>

	<p> We built a custom web-based platform to provide two interactive activities: (1) exploring the scenario above by visually inspecting the datasets, prediction results, and bias and (2) inspecting and implementing code for detecting and mitigating the bias via a hosted version of the Jupyter Notebook. You are asked to first explore the scenario, go to the provided code snippets to understand the details of machine learning components, and implement bias detection and mitigation methods by extending the skeleton code. You can click the '?' icon on the top right for more information. Don't worry too much about coding. We provide various code skeletons throughout the machine learning pipeline, except for your tasks in this assignment. </p> 
	<p> You need to have an account to use our hosted version of the Jupyter Notebook. We already created an account for each student registered in our <a href='https://human-ai.kixlab.org'>Human-AI Interaction course</a>. The default ID/PW is u&#123;<i>your student ID</i>&#125;. Please change your password via the linux terminal on the Jupyter Notebook immediately after you log in.
	 </p>

                <div className="text-center">
                    <button className='btn btn-green start-btn'> <a href='/bias-awareness-platform/#/visualization'>Start Activity </a></button>
                </div>
                <Tour 
                steps={intro_help}
                isOpen={isTourOpen}
                onRequestClose={closeTour}
                onAfterOpen={disableBody}
                onBeforeClose={enableBody}
            />
            </div>
        </div>
    )
}

export default Introduction
