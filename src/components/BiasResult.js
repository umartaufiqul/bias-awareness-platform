import React, {useState, useEffect} from "react"

const BiasResult = (props) => {

    //The biasStat can be passed through props.biasStat. I just use the accStat one as an example
    const biasStat = props.biasStat
    const [resultAvailable, setResultAvailable] = useState(true)

    //The bias measures here are just sample
    const reportTable = <table className='table' >
        <thead>
            <tr>
                <th scope="col" className="align-middle">Class</th>
                <th scope="col" className="align-middle">Disparate Impact</th>
                <th scope="col" className="align-middle">Statistical Parity Diff.</th>
                <th scope="col" className="align-middle">Equal Opportunity Diff.</th>
                <th scope="col" className="align-middle">Average Odds Diff.</th>
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

    if (resultAvailable) {
        return(
            <div style={{marginTop: "1rem"}}>
                <div id='result-table' style={{overflow: "auto", height: "inherit"}}>
                    {/* {activeResult === "report" ? reportTable : distrTable} */}
                    {reportTable}
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