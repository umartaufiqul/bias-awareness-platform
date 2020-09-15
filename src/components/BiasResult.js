import React, {useState, useEffect} from "react"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

const BiasResult = (props) => {

    //The biasStat can be passed through props.biasStat. I just use the accStat one as an example
    const biasStat = props.biasStat
    const [resultAvailable, setResultAvailable] = useState(true)
    const [measureExplain, setMeasureExplain] = useState("")

    //The bias measures here are just sample
    const reportTable = <table className='table' >
        <thead>
            <tr>
                <th scope="col" className="align-middle">Class</th>
                <th scope="col" className="align-middle">
                    Disparate Impact 
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
                        <img src={require('../icons/info.svg')} alt='' style={{cursor: "pointer"}} onClick={() => setMeasureExplain("Disparate Impact")}/>
                    </OverlayTrigger>
                    </div>
                </th>
                <th scope="col" className="align-middle">Statistical Parity Diff.
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
                        <img src={require('../icons/info.svg')} alt='' style={{cursor: "pointer"}} onClick={() => setMeasureExplain("Statictical Parity Diff")}/>
                    </OverlayTrigger>
                    </div>
                </th>
                <th scope="col" className="align-middle">Equal Opportunity Diff.
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
                        <img src={require('../icons/info.svg')} alt='' style={{cursor: "pointer"}} onClick={() => setMeasureExplain("Equal Opportunity Difference")}/>
                    </OverlayTrigger>
                    </div>
                </th>
                <th scope="col" className="align-middle">Average Odds Diff.
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
                        <img src={require('../icons/info.svg')} alt='' style={{cursor: "pointer"}} onClick={() => setMeasureExplain("Average Odds Diff")}/>
                    </OverlayTrigger>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            {biasStat.map((item, i) => 
                <tr key={i}>
                    <th scope="row"> {item.class}</th>
                    <td> {item.precision} </td>
                    <td> {item.recall} </td>
                    <td> {item.f1_score} </td>
                    <td> {item.support} </td>
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

    if (resultAvailable) {
        return(
            <div style={{marginTop: "1rem"}}>
                <div id='result-table' style={{overflow: "auto", height: "inherit"}}>
                    {/* {activeResult === "report" ? reportTable : distrTable} */}
                    {reportTable}
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

export default BiasResult