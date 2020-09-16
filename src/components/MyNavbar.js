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

    const steps = [
        {
            selector: '',
            content: () => (
                <div>
                    <h3 className='text-center'> Exploring Abusive Speech Detection </h3>
                    <p> In this page, you can interactively explore the combination of different datasets and models for the abusive speech detection, and observe how it affect the distribution and fairness of the result</p> 
                </div>
            )
        },
        {
            selector: '.explore-container',
            content: () => (
                <div>
                    <h3 className='text-center'> Explore Dataset </h3>
                    <p> There are several dataset that are can be used in this platform. Use this data exploring tab to observe what kind of tweets that belong to a certain class </p>
                </div> 
            )
        },
        {
            selector: '#interactive-controller',
            content: () => (
                <div>
                    <h3 className='text-center'> Dataset and Model </h3>
                    <p> In this part, you can change the model and dataset used for classification. </p>
                    <p> Try several combinations to see how they interact with each other. Don't forget to click the "Build Model" button everytime you want to try the new combination. Try to click it, and wait until an alert appear! </p>
                </div>
            )
        },
        {
            selector: '.scatter-chart',
            content: () => (
                <div>
                    <h3 style={{textAlign: 'center'}}> Graph </h3> 
                    <p> This graph plot each of the feedback’s probability of being toxic against the probability of it using AAE dialect. The higher its toxic probability, the higher it chance to be classified as toxic </p>
                    <p> The higher its toxic probability, the higher it chance to be classified as toxic. On the other hand, the higher its AAE dialect probability, the higher it is to come from African American students</p>
                </div>
                )
        },
        {
            selector: '#visual-result',
            content: () => (
                <div>
                    <h3 className='text-center'> Result Box </h3>
                    <p> Now that the model has been built, the result box will display not only the accuracy result for the model, but also the distribution of each class with each label </p>
                </div>
            )
        },
        {
            selector: '.associated-words',
            content: () => (
                <div>
                    <h3 className='text-center'> Associated Words </h3>
                    <p> In this part, you can enter word(s) that you want to include in the dataset. For example, if you inputted 'ugly' and press ENTER, then the dataset will only include tweets that contain the word 'ugly' in it, and exclude the rest.</p>
                    <p> Once you put all the words you want to include, don't forget to click the "Reload" button to reload the model!</p>
                </div>
            ),
        }
    ]

    const sectionList = ["1. Visualization", "2. Bias Testing", "3. Debiasing"]
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
        if (section === 1) {
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
            <Navbar.Brand id="navbar-brand">Bias Awareness Platform</Navbar.Brand>
            <Row className='mx-auto'>                    
                <Col className='d-flex align-middle'>
                    {usePrev() ? <img src={require('../icons/left-arrow.svg')} alt='' onClick={() => goToPage(section-1)}/> : <span style={{height: "16px", width: "16px"}}></span>}
                </Col>
                <Col>
                    {useDropdown() ? 
                    <NavDropdown title={sectionList[section-1]} className='text-left' id='navbar-dropdown'>
                        <NavDropdown.Item href="/bias-awareness-platform/#/visualization"> 1. Visualization</NavDropdown.Item>
                        <NavDropdown.Item href="/bias-awareness-platform/#/bias-testing"> 2. Bias Testing </NavDropdown.Item>
                        <NavDropdown.Item href="/bias-awareness-platform/#/mitigation"> 3. Debiasing </NavDropdown.Item>
                    </NavDropdown>
                    : <div style={{height: "2.5rem"}}></div>
                    }
                
                </Col>
                <Col className='d-flex align-middle'>
                    {useNext() ? <img src={require('../icons/right-arrow.svg')} alt=''onClick={() => goToPage(section+1)}/> : <span style={{height: "16px", width: "16px"}}> </span>}
                </Col>
                
            </Row>
            {returnTutorial()}
        
            <Tour 
                steps={steps}
                isOpen={isTourOpen}
                onRequestClose={closeTour}
                onAfterOpen={disableBody}
                onBeforeClose={enableBody}
            />
        </Navbar>
    )
}

export default MyNavbar