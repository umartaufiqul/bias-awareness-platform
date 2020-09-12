import React, {useState} from "react"

const Result = (props) => {

    const accStat = props.accStat
    const resultStat = props.resultStat
    const [activeResult, setActiveResult] = useState("report")

    const reportTable = <table className='table' >
        <thead>
            <tr>
                <th scope="col">Class</th>
                <th scope="col">Precision</th>
                <th scope="col">Recall</th>
                <th scope="col">f1-score</th>
                <th scope="col">Support</th>
            </tr>
        </thead>
        <tbody>
            {accStat.map((item, i) => 
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

    function handleResultChange(tab) {
        setActiveResult(tab)
    }

    return(
        <div style={{marginTop: "1rem"}}>
            <div className='d-flex justify-content-center'>
                <div className={activeResult === "report" ? 'explore-choice active' : 'explore-choice'} style={{fontSize: "12px"}} onClick={() => handleResultChange("report")}> Report </div>
                <div className={activeResult === "dist" ? 'explore-choice active' : 'explore-choice'} style={{fontSize: "12px"}} onClick={() => handleResultChange("dist")}> Distribution </div>
            </div>
            <div id='result-table' style={{overflow: "auto", height: "inherit"}}>
                {activeResult === "report" ? reportTable : distrTable}
            </div>
        </div>
    )
}

export default Result