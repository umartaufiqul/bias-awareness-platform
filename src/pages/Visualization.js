import React, {useState} from "react"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import "../style/Visualization.css"
import ScatterChart from "../components/ScatterChart"
import VisualDataset from "../components/VisualDataset"
import VisualModelNew from "../components/VisualModelNew"




const Visualization = () => {

    const [datasetActive, setDatasetActive] = useState("active")
    const [modelActive, setModelActive] = useState("")
    const [wordInput, setWordInput] = useState("")
    const [wordList, setWordList] = useState([])


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

    return(
        <div className='visualization-new'>
            <div className='visualization-new-container'>
                <div className='graph-left'>
                    <h1> Abusive Speech Detection Result </h1>
                    <div className='scatter-chart'>
                        <ScatterChart width={10} height={10}/>
                    </div>
                    <div className='associated-words'>
                        <form className='form-inline'>
                        <label> Associated words: </label>
                        <input className="form-control ml-4" type="text" value={wordInput}onChange={handleInputChange} onKeyDown={handleInputDown}></input>
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
                                    <tr>
                                        <th scope="row">Racism</th>
                                        <td> 0.001 </td>
                                        <td> 0.003 </td>
                                        <td> 0.505 </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Sexism</th>
                                        <td> 0.083 </td>
                                        <td> 0.048 </td>
                                        <td> 1.724 </td>
                                    </tr>
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