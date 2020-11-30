import React, {useState} from "react"
import Dropdown from "react-bootstrap/Dropdown"

const plus = require('../../icons/plus.svg')
const minus = require('../../icons/minus.svg')

const DatasetMitigation = () => {
    const [labelRatio, setLabelRatio] = useState(1)
    const [chosenLabel, setChosenLabel] = useState("None")   
    const [classRatio, setClassRatio] = useState(1)
    const [chosenClass, setChosenClass] = useState("None")

    function handle_calc(src, op) {
        if (src === "label") {
            if (op === "plus") {
                if (labelRatio >= 1) { alert("The ratio cannot be larger than 1.0") }
                else { setLabelRatio(labelRatio + 0.1)} }
            else {
                if (labelRatio >= 0 && labelRatio < 0.1) { alert("The ratio cannot be smaller than 0") }
                else { setLabelRatio(labelRatio - 0.1)} }
        }
        else {
            if (op === "plus") {
                if (classRatio >= 1) { alert("The ratio cannot be larger than 1.0") }
                else { setClassRatio(classRatio + 0.1)} }
            else {
                if (classRatio >= 0 && classRatio < 0.1) { alert("The ratio cannot be smaller than 0") }
                else { setClassRatio(classRatio - 0.1)} }
        }
    }

    function handle_selection(src, choice) {
        if (src === "label") {
            setChosenLabel(choice)
        }
        else {
            setChosenClass(choice)
        }
    }
    
     return(
        <div className="page-box dataset-mitigation text-center">
            <h2 style={{marginBottom: "1rem"}}> Dataset Mitigation </h2>
            <div style={{height: "350px", backgroundColor: "grey"}}>
                <h4> Current dataset </h4>
            </div>
            <div style={{textAlign: "left"}}>
                <h3 style={{margin: "1rem 0rem"}}> Mitigation Method </h3>
                <h4 style={{margin: "1rem 0rem"}}> Action 1: Undersampling </h4>
                <p> Undersampling is used to blablajkjafhefkjkakshfldkjsdhklafjdlslskajdfhla</p>
                <div class='label-undersampling'>
                    <div style={{display: "flex", alignItems: "center"}} className="undersampling">
                        {/* Label refers to the abusive label. The given sample is for dataset 1 */}
                        <p className="input-label"> Choose a label: </p>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {chosenLabel}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handle_selection("label", "Hateful")}> Hateful </Dropdown.Item>
                                <Dropdown.Item onClick={() => handle_selection("label", "Offensive")}> Offensive </Dropdown.Item>
                                <Dropdown.Item onClick={() => handle_selection("label", "Neither")}> Neither </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <p className="input-label"> Sampling Ratio: </p>

                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", border: "2px solid black", borderRadius: "5px", minWidth: "150px", padding: "2px"}}> 
                            <div class="num-input" onClick={() => handle_calc("label", "minus")}>
                                <img src={minus} alt=''/> 
                            </div>
                            <h5 style={{marginBottom: "0px"}}> {labelRatio.toFixed(2)} </h5>
                            <div class="num-input" onClick={() => handle_calc("label", "plus")}> 
                                <img src={plus} alt=''/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='class-undersampling' style={{marginTop: "1rem"}}>
                    <div style={{display: "flex", alignItems: "center"}} className="undersampling">
                        <p className="input-label"> Choose a class: </p>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {chosenClass}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handle_selection("class", "AAE")}> AAE </Dropdown.Item>
                                <Dropdown.Item onClick={() => handle_selection("class", "SAE")}> SAE </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <p className="input-label"> Sampling Ratio: </p>

                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", border: "2px solid black", borderRadius: "5px", minWidth: "150px", padding: "2px"}}> 
                            <div class="num-input" onClick={() => handle_calc("class", "minus")}>
                                <img src={minus} alt=''/> 
                            </div>
                            <h5 style={{marginBottom: "0px"}}> {classRatio.toFixed(2)} </h5>
                            <div class="num-input" onClick={() => handle_calc("class", "plus")}> 
                                <img src={plus} alt=''/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <button class='btn btn-green' style={{margin: "3rem auto"}}> SAVE </button>
        </div>
    )
}

export default DatasetMitigation;