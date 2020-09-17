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
                <h1 className="text-center"> <b>Assignment 1. Bias in Abusive Language Detection</b><br />  (Due: Sep 29. 11:59PM)</h1>
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
                <p> Abusive language detection is commonly used in social media context such as facebook and twitter, in order to filter out post that are deemed abusive. However, many papers pointed out that hate speech detection technology, such as perspective API, are biased toward flagging more tweets that use AAE (African-American English) dialect than that use SAE (Standard American English). </p>
                <p> In this assignment, students are asked to explore the datasets, implement how to measure a bias, and mitigate the bias. We provide three datasets, each of which consists of 20000+ tweets. We are going to train a machine learning model called Logistic Regression to classify whether a tweet is abusive such as hateful, abusive, or not (i.e. normal tweet). With the trained model, we are going to check whether the model gives a biased prediction with respect to the dialects (AAE and SAE) using a whole different tweet dataset, which has not been used in the training phase. <br></br></p>
                <p> This platform supports two interactive activities: (1) exploring the scenario by visually going through datasets, prediction results, and bias and (2) inspecting and implementing codes via Jupyter Notebook. Students are asked to first explore the scneario, go to the codes to understand details of computations, and implement taks given. You can click '?' icon on the top right for more information. Don't worry too much about coding. We provide all the codes throughout the machine learning pipeline, except for your tasks in this assignment. <br /> </p>
                <p> Students need to have an account to use Jupyter Notebook. We already created an account for each student. The default ID/PW is your student ID. Please change your password via linux terminal on Jupyter Notebook. <br /> </p>
                <p> Students need to submit two things: (1) The codes and (2) discussion. Students do not need to explicitly submit the codes as the server keeps track of your codes. The discussion needs to be submitted on KLMS. We highly encourage you to put resources on the Jupyter Notebook such as codes, figures, and statistical results on the discussion so that your discussion can be supported with a reasonable evidence. The discussion items are posted <a href='https://docs.google.com/document/d/1IhUJRv2LegBiq5IIzZVQ0s2CEwaSBzldtLYrBh3aqJk/' style={{color: 'blue'}}>here</a>. <br /> </p>
                <p> Please note that the objective of this assignment is not to optimize for reducing bias, but to explore possible ways of measuring and mitigating bias. Therefore, students do not need to worry too much about figuring out "better ways of measuring/mitigating bias". The objective of this assignment is to explore possible ways of measuring/mitigating such bias, think about its pros and cons, and discuss its social impact. <br /> </p>
                <p> You are the user of this platform, which means you are always right! Please let us know if you have any question or suggestion about the platform. We are going to iterate this platform so that we keep improving students' learning experience. Hope you enjoy this assignment!<br /> </p>
                
                

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