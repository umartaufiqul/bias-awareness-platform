import React, {useState, useEffect} from "react"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import "../style/StepProgress.css"
import {Row, Col} from "react-bootstrap"
import {useSelector, useDispatch} from "react-redux"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Tour from "reactour"
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock"
import {setSection} from "../actions"

const MyNavbar = () => {
    const help = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='white'><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.25 17c0 .69-.559 1.25-1.25 1.25-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25zm1.393-9.998c-.608-.616-1.515-.955-2.551-.955-2.18 0-3.59 1.55-3.59 3.95h2.011c0-1.486.829-2.013 1.538-2.013.634 0 1.307.421 1.364 1.226.062.847-.39 1.277-.962 1.821-1.412 1.343-1.438 1.993-1.432 3.468h2.005c-.013-.664.03-1.203.935-2.178.677-.73 1.519-1.638 1.536-3.022.011-.924-.284-1.719-.854-2.297z"/></svg>

    const steps = [[], [
        {
            selector: '',
            content: () => (
                <div>
                    <h3 className='text-center'> Exploring datasets and model performance</h3>
                    <p> In this page, you can explore the datasets and model performance for the abusive speech detection. We will go over each component one by one. </p> 
                </div>
            )
        },
        {
            selector: '.explore-container',
            content: () => (
                <div>
                    <h3 className='text-center'> Explore Datasets </h3>
                    <p> This component shows representations of the dataset. We provide table representation and graph representation. Observe what kind of tweets that belong to a certain class </p>
                </div> 
            )
        },
        {
            selector: '#interactive-controller',
            content: () => (
                <div>
                    <h3 className='text-center'> Dataset and Model </h3>
                    <p> We provide three datasets and one model. You can see details of a dataset once you hover the 'i' icon. </p>
                </div>
            )
        },
        {
            selector: '#visual-result',
            content: () => (
                <div>
                    <h3 className='text-center'> Model performance </h3>
                    <p> Now that the model has been built, the performance of model is displayed. The performance includes precision, recall, and f1-score. You can also check out the confusion matrix below.</p>
                </div>
            )
        }],
        [
        {
            selector: '',
            content: () => (
                <div>
                    <h3 className='text-center'> Checking Bias </h3>
                    <p> We explored the datasets, built the model, and evaluated the performance. Now it is time to check whether our model has a certain bias or not. <br /> <br /> Here we have a whole new dataset, which has not been used on model training/evaluating phase. With this dataset, we are going to see whether our model gives a biased prediction with respect to dialects. <br /></p> 
                </div>
            )
        },
        {
            selector: '.explore-container',
            content: () => (
                <div>
                    <h3 className='text-center'> Dataset for Bias Testing </h3>
                    <p> Here is the new dataset for checking bias. It consists 2000 tweets, 1000 tweets written in AAE(African-American English) and 1000 tweets written in SAE(Standard-American English). 
                        Here, we already made predictions, whether the tweets are abusive or not, by the model we built. 
                        The dialect column represents the dialects (AAE or SAE).
                        <br /> <br /> 

                        Therefore, we have tweets, labels of dialects, and labels of model predictions. 
                        Again, "Predicted Label" refers to model's prediction, not the ground truth. 
                        We don't have a ground truth for this dataset as this dataset is for checking the bias. 
                        <br /> <br /> 
                        
                        In other words, we check the bias by <b>prediction results</b> of the model (whether the distribution 
                        of predictions is different with respect to the dialects), regardless of whether the prediction is 
                        correct or not. </p> 
                </div>
            )
        },
        {
            selector: '#interactive-controller',
            content: () => (
                <div>
                    <h3 className='text-center'> Datasets used in the model building </h3>
                    <p> Here are three datasets that we used in the model building phase. Again, this three datasets are used in model building, not checking the bias in this stage. We only use the dataset on the left to check the bias. <br /> <br />Please observe that if you change this dataset, then the labels in "Prediction Label" column is going to be changed. </p> 
                </div>
            )
        },
        {
            selector: '#visual-result',
            content: () => (
                <div>
                    <h3 className='text-center'> Result of Bias Testing </h3>
                    <p> We present the result of bias testing. The table shows the portion of predictions by model with respect to the abusiveness class. 
                        For example, 0.704 in P<sub>AAE</sub> for the label "Hateful" means that our model predicted 70.4% of AAE tweets as "Hateful". <br /> <br /> The ratio between P<sub>AAE</sub> and P<sub>SAE</sub> can be used as a measure of bias. 
                        Think about the meaning of the ratio and why it can be used as a measure. <br /> 
                        Please note that the ratio can be <b> just a single measure</b> that captures <b>a specific situation</b>.  
                        <br /> <br /> 
                        You can refer to the graph below to see general trend of the result. It presents how classification results look like for the <b> testing dataset</b>, not the dataset used in training phase.</p> 
                </div>
            )
        },
    ]
    ]

    const sectionList = ["1. Exploring datasets and model performance", "2. Checking bias", "3. Understanding details and implementing tasks"]
    const section = useSelector(state => state.section)
    const dispatch = useDispatch()
    const [isTourOpen, setIsTourOpen] = useState(false)

    useEffect(() => {
        if (window.location.href.includes("mitigation")) {
            dispatch(setSection(3))
        }
        else if (window.location.href.includes("visualization")) {
            dispatch(setSection(1))
        }
        else if (window.location.href.includes("bias-testing")) {
            dispatch(setSection(2))
        }
        else if (window.location.href.includes("fin")) {
            dispatch(setSection(4))
        }
    })

    function closeTour() {
        setIsTourOpen(false)
    };

    function openTour(){
        setIsTourOpen(true)
    }

    function goToPage(page_index) {
        console.log(page_index)
        switch(page_index) {
            case 1:
                window.location.href = "/bias-awareness-platform/#/visualization"
                dispatch(setSection(1))
                break;
                // window.location.reload()
            case 2:
                window.location.href = "/bias-awareness-platform/#/bias-testing"
                dispatch(setSection(2))
                break;
                // window.location.reload()
            case 3:
                window.location.href = "/bias-awareness-platform/#/mitigation"
                dispatch(setSection(3))
                // alert("This page is not available. For now")
                break;
            default:
                alert("No such page!")
        }
    }

    function disableBody(target) {disableBodyScroll(target)};
    function enableBody(target) {enableBodyScroll(target)}; 

    function giveWarning() {
        alert("This page is not available. For now")
    }

    function returnTutorial() {
        if (section === 1 || section === 2) {
            return(
                <div className='tutorial-button'>
                <OverlayTrigger
                key={'left'}
                placement={'left'}
                overlay={
                    <Tooltip id={`tooltip-${'left'}`}>
                    Click here to see the complete tutorial of the page
                    </Tooltip>
                }
                >
                    <div style={{cursor: "pointer"}} onClick={openTour}>
                        {help}
                    </div>
                </OverlayTrigger>
                </div>
            )
        }
    }

    const usePrev = () => {
        return section > 1 && section < 4
    }

    const useNext = () => {
        return section > 0 && section < 3
    }

    const useDropdown = () => {
        return section > 0 && section < 4
    }

    return(
        <Navbar className='justify-content-center' id='navbar'>
            <Navbar.Brand id="navbar-brand">Assignment 1. Bias in Abusive Language Detection</Navbar.Brand>
            <Row className='mx-auto'>                    
                <Col className='d-flex align-middle'>
                    {usePrev() ? <img src={require('../icons/left-arrow.svg')} alt='' onClick={() => goToPage(section-1)}/> : <span style={{height: "16px", width: "16px"}}></span>}
                </Col>
                <Col>
                    {useDropdown() ? 
                    <NavDropdown title={sectionList[section-1]} className='text-left' id='navbar-dropdown'>
                        <NavDropdown.Item href="/bias-awareness-platform/#/visualization"> {sectionList[0]}</NavDropdown.Item>
                        <NavDropdown.Item href="/bias-awareness-platform/#/bias-testing"> {sectionList[1]} </NavDropdown.Item>
                        <NavDropdown.Item href="/bias-awareness-platform/#/mitigation"> {sectionList[2]} </NavDropdown.Item>
                    </NavDropdown>
                    : <div style={{height: "3.5rem"}}></div>
                    }
                
                </Col>
                <Col className='d-flex align-middle'>
                    {useNext() ? <img src={require('../icons/right-arrow.svg')} alt=''onClick={() => goToPage(section+1)}/> : <span style={{height: "16px", width: "16px"}}> </span>}
                </Col>
                
            </Row>
            {returnTutorial()}
        
            <Tour 
                steps={steps[section]}
                isOpen={isTourOpen}
                onRequestClose={closeTour}
                onAfterOpen={disableBody}
                onBeforeClose={enableBody}
            />
        </Navbar>
    )
}

export default MyNavbar