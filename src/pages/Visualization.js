import React, {useState, useEffect} from "react"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import "../style/Visualization.css"
import {useDispatch, useSelector} from "react-redux"
import ScatterChart from "../components/ScatterChart"
import VisualDataset from "../components/VisualDataset"
import VisualModelNew from "../components/VisualModelNew"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import { activateLoader, deactivateLoader } from "../actions"
import Form from "react-bootstrap/Form"
import Result from "../components/Result"
import DataTable from "../components/DataTable"

const Visualization = () => {

    const [datasetActive, setDatasetActive] = useState("active")
    const [modelActive, setModelActive] = useState("")
    const [wordInput, setWordInput] = useState("")
    const [wordList, setWordList] = useState([])
    const [categoryList, setCategoryList] = useState(["Hateful", "Abusive", "neither"])
    const [category, setCategory] = useState(categoryList[0])
    const [exploreActive, setExploreActive] = useState("data")
    const [labelActive, setLabelActive] = useState([])

    const loaderActive = useSelector(state => state.loaderActive)
    const resultModel = useSelector(state => state.model)
    const resultData = useSelector(state => state.data)
    const dispatch = useDispatch()
    

    const tweetListSample = [{
      tweet: "Tweet sample but I nned to make it long so forgive me for the length okay",
      label: "neither"
    }, {
        tweet: "Tweet sample but I need to make it long so forgive me for the length okay",
        label: "Hateful"
      }, {
        tweet: "Tweet sample but I nned to make it long so forgive me for the length okay",
        label: "Abusive"
      }, {
        tweet: "Tweet sample but I nned to make it long so forgive me for the length okay",
        label: "neither"
      }, {
          tweet: "Tweet sample but I need to make it long so forgive me for the length okay",
          label: "Hateful"
        }, {
          tweet: "Tweet sample but I nned to make it long so forgive me for the length okay",
          label: "Abusive"
        }]
    const resultStat = [{
        class: "Racism",
        pblack: 0.001,
        pwhite: 0.003,
        pblack_white: 0.005,
    }, {
        class: "Sexism",
        pblack: 0.083,
        pwhite: 0.048,
        pblack_white: 1.724
    }]

    const accStat = [{
        class: "Racism",
        precision: 0.77,
        recall: 0.86,
        f1_score: 0.81,
        support: 3756
    }, {
        class: "Sexism",
        precision: 0.84,
        recall: 0.75,
        f1_score: 0.79,
        support: 1344
    }]


    function changeActiveState(id) {
        console.log(id)
        if (id === "dataset-tab" && datasetActive === "") {
           setDatasetActive("active");
           setModelActive("");
        } else if (id === "model-tab" && modelActive === ""){
            setDatasetActive("");
            setModelActive("active");
        }
    };

    function changeContent() {
        if (datasetActive === "active") {
            return <VisualDataset />
        }
        else {
            return <VisualModelNew />
        }
    };

    function handleExploreChange(tab) {
        setExploreActive(tab)
    }

    function handleInputChange(e) {
        setWordInput(e.target.value)
    };


    function handleInputDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault()
            const {value} = e.target
            setWordList([...wordList, value]);
            setWordInput("")
        }
    };

    function handleRemove(index) {
        return () => {
            setWordList(wordList.filter((item, i) => i !== index))
        }
    };

    function handleModelChange() {
        dispatch(activateLoader())
        setTimeout(function(){
            dispatch(deactivateLoader())
            alert("The model has been reloaded")
        }, 5000)
    }

    function changeCategory(index) {
        return () => {
            setCategory(categoryList[index])
        }
    }

    function returnBadCategory() {
        //The only good category should be on the last
        var categories = [...categoryList]
        categories.pop()
        return (
            categories.map((item, i) => 
                <Dropdown.Item key={i} onClick={changeCategory(i)}>
                    {item}
                </Dropdown.Item>
            )
        )
    }


    function selectExplore() {
        if (exploreActive === "result") {
            return (
            <div className="explore-container" style={{marginTop: "1rem"}}>
            <h1> Abusive Speech Detection Result </h1>
            <div className='scatter-chart' style={{position: "relative", overflowY: "auto"}}>
                <ScatterChart width={10} height={10} catName={category}/>
                <form className='form-inline justify-content-center align-item-center' style={{marginTop: "1rem"}}>
                    <label style={{marginRight: "1rem"}}> <h6> Class: </h6></label>
                    <DropdownButton id="dropdown-basic-button" title={category}>
                        {returnBadCategory()}
                    </DropdownButton>
                </form>
            </div>
        </div>)
        }
        else {
            return (<DataTable categoryList={categoryList} tweetListSample={tweetListSample}/>)
        }
    }

    return(
        <div className='visualization-new'>
            <div className={'loader '+loaderActive}>
                <h3> Please wait a moment </h3>
                <p style={{marginTop: "1rem"}}> Your model is current being built.</p>
                <div className='spinner'></div>
            </div>
            <div className='visualization-new-container'>
                <div className='graph-left'>
                    <div className='d-flex justify-content-center'>
                        <div className={exploreActive === "data" ? 'explore-choice active' : 'explore-choice'} onClick={() => handleExploreChange("data")}> Data </div>
                        <div className={exploreActive === "result" ? 'explore-choice active' : 'explore-choice'} onClick={() => handleExploreChange("result")}> Result </div>
                    </div>
                    {selectExplore()}
                    {/* <div className='associated-words'>
                        <form className='form-inline'>
                        <label> Associated words: </label>
                        <input className="form-control ml-4" type="text" value={wordInput} onChange={handleInputChange} onKeyDown={handleInputDown}></input>
                        <OverlayTrigger
                            key={'top'}
                            placement={'top'}
                            overlay={
                                <Tooltip id={`tooltip-${'top'}`}>
                                Specify words that must be included in the dataset and exclude the rest of dataset. For example, inputting 'ugly' means the data processed are only tweets that contain 'ugly' in it.
                                </Tooltip>
                            }
                            >
                            <img src={require('../icons/help.svg')} alt='' id='help-tag'/>
                        </OverlayTrigger>
                        <button className='btn btn-green ml-4' onClick={(e) => {
                            e.preventDefault()
                            handleModelChange()
                            }}> Reload </button>
                        </form>
                        <ul className='word-container'>
                            {wordList.map((item, i) => 
                                <li key={i} className='word-tag'>
                                    <span> {item} </span>
                                    <img src={require('../icons/x-mark.svg')} alt='' onClick={handleRemove(i)}/>
                                </li>
                            )}
                        </ul>
                    </div> */}
                    
                </div>
                <div className='interactive-right'>
                    <div id='interactive-controller'>
                        <div className='d-flex interact-tab'> 
                            <div className={'interactive-choice '+ datasetActive} id="dataset-tab" onClick={(e) => changeActiveState(e.currentTarget.id)}> DATASET </div>
                            <div className={'interactive-choice '+modelActive} id="model-tab" onClick={(e) => changeActiveState(e.currentTarget.id)}> MODEL </div>
                        </div>
                        <div className="interact-container">
                            {changeContent()}
                        </div>
                        <div className='load-btn'>
                            <button type='button' className="btn btn-green" onClick={(e) => {
                            e.preventDefault()
                            handleModelChange()
                            }}> Build Model </button>
                        </div>
                    </div>
                    <div id='visual-result'>
                        <h3> Result </h3>
                        {/* <div>
                            <span> Model: Model {resultModel+1} </span>
                            <span style={{marginLeft: "1rem"}}> Dataset: Dataset {resultData+1} </span> 
                        </div> */}
                        <Result resultStat={resultStat} accStat={accStat}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Visualization