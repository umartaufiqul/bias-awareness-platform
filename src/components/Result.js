import React, {useState, useEffect} from "react"

const Result = (props) => {
    const accStat = props.accStat
    const resultStat = props.resultStat
    const resultAvailable = props.resultAvailable
    const activeResult = props.activeResult

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

    console.log(activeResult)
    console.log(distrTable)
    console.log(resultStat);

    if (resultAvailable) {
        return(
            <div style={{marginTop: "1rem"}}>
                <div id='result-table' style={{overflow: "auto", height: "inherit"}}>
                    {activeResult === "report" ? reportTable : distrTable}
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