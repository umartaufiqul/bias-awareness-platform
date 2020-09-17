import React, {useState, useEffect} from "react"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import HeapMap from 'react-heatmap-grid'
import MathJax from 'react-mathjax2'

const Result = (props) => {
    const accStat = props.accStat
    const resultStat = props.resultStat
    const resultAvailable = props.resultAvailable
    const activeResult = props.activeResult

    const xLabels = props.accStat.labels;
    const yLabels = props.accStat.labels;
    const data = props.accStat.matrix;

    const [measureExplain, setMeasureExplain] = useState("")

    const reportTable = <table className='table' >
        <thead>
            <tr>
                <th scope="col">Class</th>
                <th scope="col">Precision</th>
                <th scope="col">Recall</th>
                <th scope="col">F1-score</th>
                <th scope="col">Support
                            <OverlayTrigger
                            key={'right'}
                            placement={'top'}
                            overlay={
                                <Tooltip id={`tooltip-${'right'}`} className='text-align-left'>
                                    The number of <br /> predictions by model <br />
                                </Tooltip>
                            }
                            >
                            <img src={require('../icons/info.svg')} alt='' className='info-icon'/>
                            </OverlayTrigger>
                </th>
            </tr>
        </thead>
        <tbody>
            {'stat' in accStat ? 
            accStat.stat.map((item, i) => 
                <tr key={i}>
                    <th scope="row"> {item.class}</th>
                    <td> {item.precision} </td>
                    <td> {item.recall} </td>
                    <td> {item.f1_score} </td>
                    <td> {item.support} </td>
                </tr>
            )
            :
            <div> </div>
            }
            {
                'macro' in accStat ?
                <>
                        <tr style={{ 'border-top': '2px solid rgb(120, 127, 124)' }}>
                            <th> accuracy </th>
                            <td>  </td>
                            <td> </td>
                            <td> {accStat.accuracy} </td>
                            <td> {accStat.support} </td>
                        </tr>
                        <tr>
                            <th> macro avg </th>
                            <td> {accStat.macro.precision} </td>
                            <td> {accStat.macro.recall} </td>
                            <td> {accStat.macro.f1_score} </td>
                            <td> {accStat.support} </td>
                        </tr>
                        <tr>
                            <th> weight avg </th>
                            <td> {accStat.weighted.precision} </td>
                            <td> {accStat.weighted.recall} </td>
                            <td> {accStat.weighted.f1_score} </td>
                            <td> {accStat.support} </td>
                        </tr>
                </>
                    :
                    <div></div>
            }
        </tbody>
    </table>

    const distrTable = <table className='table'>
        <thead>
            <tr>
                <th scope="col" className='align-middle'>
                    Class
                </th>
                <th scope="col">
                    P<sub>AAE</sub>
                    <div>
                    <OverlayTrigger
                        key={'right'}
                        placement={'right'}
                        overlay={
                            <Tooltip id={`tooltip-${'right'}`} className='text-align-left'>
                                {/*</Tooltip>
                                <MathJax.Context
                                input='ascii'
                                >
                                <MathJax.Node inline>text={'frac{# of blahblah }{# tweets}'} < /MathJax.Node>
                                </MathJax.Context>*/}
                                # of predicted labels / <br /> # of tweets <br /> given AAE
                            </Tooltip>
                        }
                        >
                        <img src={require('../icons/info.svg')} alt='' style={{cursor: "pointer"}} />
                    </OverlayTrigger>
                    </div>
                </th>
                <th scope="col">
                    P<sub>SAE</sub>
                    <div>
                    <OverlayTrigger
                        key={'right'}
                        placement={'right'}
                        overlay={
                            <Tooltip id={`tooltip-${'right'}`} className='text-align-left'>
                                # of predicted labels / <br /> # of tweets <br /> given SAE
                            </Tooltip>
                        }
                        >
                        <img src={require('../icons/info.svg')} alt='' style={{cursor: "pointer"}}/>
                    </OverlayTrigger>
                    </div>
                    </th>
                <th scope="col" className='align-middle'>
                    P<sub>AAE</sub> / P<sub>SAE</sub>
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
    console.log(xLabels);

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
                {
                    activeResult === "report" ? 
                        <>
                            <h1> Confusion Matrix </h1>
                            <br></br>
                            <div style={{ fontSize: '18px', transform: 'translateX(25px)' }}> Predicted categories </div>
                            {
                                xLabels != null ?
                                    <div style={{ margin: '0 auto', width: (xLabels.length * 100 + 200) + 'px', transform: 'translateX(-100px)' }}>
                                        <div style={{ float: 'left', transform: 'rotate(-90deg) translateX(-' + (xLabels.length * 50) + 'px) translateY(70px)', fontSize: '18px' }}> True categories </div>
                                        <div style={{ float: 'left' }}>
                                            <HeapMap xLabels={xLabels}
                                                yLabels={yLabels}
                                                data={data}
                                                height={100}
                                                squares={true}
                                                yLabelWidth={100}
                                                cellStyle={(background, value, min, max, data, x, y) => ({
                                                    background: `rgba(89, 158, 248, ${1 - (max - value) / (max - min)})`,
                                                    fontSize: "15px",
                                                })}
                                                cellRender={value => value && `${value}`}
                                                title={(value, unit) => `${value}`}

                                            />
                                        </div>
                                    </div>
                                    :
                                    ''
                            }
                        </>
                        :
                        ''
                }
            </div>
        )
    }
    else {
        return (
            <div style={{ marginTop: "1rem", padding: "0rem 5rem" }}>
                <h3 style={{ marginTop: "5rem", color: "#676767" }}> No result to display </h3>
                <p> There is no model that has been built yet. You can build a model using the model builder panel on the right side of the page. </p>
            </div>
        )
    }
}

export default Result