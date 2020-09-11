import React, {useState, useEffect} from "react"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import "../style/Visualization.css"
import ScatterChart from "../components/ScatterChart"
import VisualDataset from "../components/VisualDataset"
import VisualModelNew from "../components/VisualModelNew"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock"

const Visualization = () => {

    const [datasetActive, setDatasetActive] = useState("active")
    const [modelActive, setModelActive] = useState("")
    const [wordInput, setWordInput] = useState("")
    const [wordList, setWordList] = useState([])
    const [categoryList, setCategoryList] = useState(["Hateful", "Abusive"])
    const [category, setCategory] = useState(categoryList[0])
    const [loaderActive, setLoaderActive] = useState("d-none")

    useEffect((e) => {
        if (loaderActive === "") {
            disableBody(document)
        }
    })
    
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

    function changeCategory(index) {
        return () => {
            setCategory(categoryList[index])
        }
    }

    function disableBody(target) {disableBodyScroll(target)};
    function enableBody(target) {enableBodyScroll(target)}; 

    return(
        <div className='visualization-new'>
            <div className={'loader-bg '+loaderActive}>

            </div>
            <div className={'loader '+loaderActive}>
                <h3> Please wait a moment </h3>
                <p style={{marginTop: "1rem"}}> Your model is current being built.</p>
                <div className='spinner'></div>
            </div>
            <div className='visualization-new-container'>
                <div className='graph-left'>
                    <h1> Abusive Speech Detection Result </h1>
                    <div className='scatter-chart'>
                        <ScatterChart width={10} height={10} catName={category}/>
                        <form className='form-inline justify-content-center align-item-center' style={{marginTop: "1rem"}}>
                            <label style={{marginRight: "1rem"}}> <h6> Class: </h6></label>
                            <DropdownButton id="dropdown-basic-button" title={category}>
                                {categoryList.map((item, i) => 
                                        <Dropdown.Item key={i} onClick={changeCategory(i)}>
                                            {item}
                                        </Dropdown.Item>
                                )}
                            </DropdownButton>
                        </form>
                    </div>
                    <div className='associated-words'>
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
                        <button className='btn btn-green ml-4' onClick={(e) => {e.preventDefault()}}> Reload </button>
                        </form>
                        <ul className='word-container'>
                            {wordList.map((item, i) => 
                                <li key={i} className='word-tag'>
                                    <span> {item} </span>
                                    <img src={require('../icons/x-mark.svg')} alt='' onClick={handleRemove(i)}/>
                                </li>
                            )}
                        </ul>
                    </div>
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
                            <button type='button' className="btn btn-green"> Build Model </button>
                        </div>
                    </div>
                    <div id='visual-result'>
                        <h3> Result </h3>
                        <div id='result-table'>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Visualization