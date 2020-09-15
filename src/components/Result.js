import React, {useState, useEffect} from "react"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

const Result = (props) => {
    const accStat = props.accStat
    const resultStat = props.resultStat
    const resultAvailable = props.resultAvailable
    const activeResult = props.activeResult
    
    const [measureExplain, setMeasureExplain] = useState("")

    const reportTable = <table className='table' >
        <thead>
            <tr>
                <th scope="col">Class</th>
                <th scope="col">Precision</th>
                <th scope="col">Recall</th>
                <th scope="col">f1-score</th>
            </tr>
        </thead>
        <tbody>
            {accStat.map((item, i) => 
                <tr key={i}>
                    <th scope="row"> {item.class}</th>
                    <td> {item.precision} </td>
                    <td> {item.recall} </td>
                    <td> {item.f1_score} </td>
                </tr>
            )}
        </tbody>
    </table>

    const distrTable = <table className='table'>
        <thead>
            <tr>
                <th scope="col" className='align-middle'>
                    Class
                </th>
                <th scope="col">
                    Pblack
                    <div>
                    <OverlayTrigger
                        key={'right'}
                        placement={'right'}
                        overlay={
                            <Tooltip id={`tooltip-${'right'}`} className='text-align-left'>
                                Click here to see how the measure is calculated
                            </Tooltip>
                        }
                        >
                        <img src={require('../icons/info.svg')} alt='' style={{cursor: "pointer"}} onClick={() => setMeasureExplain("Pblack")}/>
                    </OverlayTrigger>
                    </div>
                </th>
                <th scope="col">
                    Pwhite
                    <div>
                    <OverlayTrigger
                        key={'right'}
                        placement={'right'}
                        overlay={
                            <Tooltip id={`tooltip-${'right'}`} className='text-align-left'>
                                Click here to see how the measure is calculated
                            </Tooltip>
                        }
                        >
                        <img src={require('../icons/info.svg')} alt='' style={{cursor: "pointer"}} onClick={() => setMeasureExplain("Pwhite")}/>
                    </OverlayTrigger>
                    </div>
                    </th>
                <th scope="col">
                    Pblack/Pwhite
                    <div>
                    <OverlayTrigger
                        key={'right'}
                        placement={'right'}
                        overlay={
                            <Tooltip id={`tooltip-${'right'}`} className='text-align-left'>
                                Click here to see how the measure is calculated
                            </Tooltip>
                        }
                        >
                        <img src={require('../icons/info.svg')} alt='' style={{cursor: "pointer"}} onClick={() => setMeasureExplain("Pblack/Pwhite")}/>
                    </OverlayTrigger>
                    </div>
                </th>
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

    //Add the measure explanation here
    function returnMeasureExplain() {
        switch(measureExplain){
            default:
                return (
                <div style={{marginTop: "1rem"}}> This is the explanation of how measure is calculated</div>
                )
        }
    }

    console.log(activeResult)
    console.log(distrTable)
    console.log(resultStat);

    if (resultAvailable) {
        return(
            <div style={{marginTop: "1rem"}}>
                <div id='result-table' style={{overflow: "auto", height: "inherit"}}>
                    {activeResult === "report" ? reportTable : distrTable}
                </div>
                <div className={measureExplain === "" ? "d-none": ""}>
                    <h5> How the measure is calculated:</h5>
                    <h6 style={{textDecoration: "underline"}}> {measureExplain} </h6>
                    {returnMeasureExplain()}
                </div>
            </div>
        )
    }
    else {
        return(
            <div style={{marginTop: "1rem", padding: "0rem 5rem"}}>
                <h3 style={{marginTop: "5rem", color: "#676767"}}> No result to display </h3>
                <p> There is no model that has been built yet. You can build a model using the model builder panel on the right side of the page. </p>
            </div>
        )
    }
}

export default Result