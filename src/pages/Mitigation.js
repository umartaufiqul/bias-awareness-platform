import React, {useState, useEffect} from "react"
import "../style/Mitigation.css"
import {useHistory} from 'react-router-dom'
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import MitigationAlgo from "../components/MitigationAlgo"
import {Col, Row} from "react-bootstrap"

const dataset_fill = require('../icons/dataset_fill.svg')
const dataset = require('../icons/dataset.svg')
const classifier_fill = require('../icons/classifier_fill.svg')
const classifier = require('../icons/classifier.svg')
const predict_fill = require('../icons/prediction_fill.svg')
const predict = require('../icons/prediction.svg')

const Mitigation = (props) => {

    const [datasetSrc, setDatasetSrc] = useState(dataset_fill)
    const [classifierSrc, setClassifierSrc] = useState(classifier_fill)
    const [predictSrc, setPredictSrc] = useState(predict_fill)
    const [selected, setSelected] = useState("none")
    const [accStat, setAccStat] = useState(null)
    const history = useHistory()

    const server_address = 'http://127.0.0.1:5000/'
    const label = ['Hateful', 'Offensive', 'Neither']

    useEffect(() => {
        test_prediction()
    }, [])

    function choose_phase(id) {
        setDatasetSrc(dataset)
        setClassifierSrc(classifier)
        setPredictSrc(predict)
        if (id === "dataset") { 
            setDatasetSrc(dataset_fill) 
            history.push('/dataset-mitigation')
        }
        else if (id === "classifier") { setClassifierSrc(classifier_fill) }
        else { setPredictSrc(predict_fill) }
    }

    function display_pred_res(accStat) {
        if (accStat !== null) {
            const reportTable = 
            <table className ='table' >
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
                                <tr style={{ 'borderTop': '2px solid rgb(120, 127, 124)' }}>
                                    <th> accuracy </th>
                                    <td>  </td>
                                    <td> </td>
                                    <td> {accStat.accuracy} </td>
                                    <td> {accStat.support} </td>
                                </tr>
                                <tr>
                                    <th> macro avg </th>
                                    <td> {accStat.macro.precision.toFixed(2)} </td>
                                    <td> {accStat.macro.recall.toFixed(2)} </td>
                                    <td> {accStat.macro["f1-score"].toFixed(2)} </td>
                                    <td> {accStat.macro.support} </td>
                                </tr>
                                <tr>
                                    <th> weight avg </th>
                                    <td> {accStat.weighted.precision.toFixed(2)} </td>
                                    <td> {accStat.weighted.recall.toFixed(2)} </td>
                                    <td> {accStat.weighted["f1-score"].toFixed(2)} </td>
                                    <td> {accStat.weighted.support} </td>
                                </tr>
                        </>
                            :
                            <div></div>
                    }
                </tbody>
            </table>
            return reportTable
        }
        else {
            return(
            <div>
                <h4> Loading for the result....</h4>
                <div className="result-loader"> </div>
            </div>)
        }
    }

    // Send the data to server to get the prediction
    function test_prediction() {
        console.log("Sending to server")
        const data = JSON.parse(window.sessionStorage.getItem("current_dataset"))
        console.log(data)
        var ext = 'data';const data_json = {
            "data": data,
            "label": ['Hateful', 'Offensive', 'Neither']
        }   

        const otherParam = {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data_json),
            method: "POST",
        }
        fetch(server_address+ext, otherParam).then(
            data => {return data.json()}
        ).then(res => {
            var stat = []
            for (var key in Object.keys(res.report)) {
                //For class prediction, convert the number into string
                if (/^\d+$/.test(key) && typeof res.report[key] !== 'undefined') {
                    //Statistic for a class
                    var curr_stat = {
                        //Note: The class is very hardcoded and not flexible when the dataset is custom
                        class: ['Hateful', 'Offensive', 'Neither'][parseInt(key)],
                        precision: res.report[key]["precision"].toFixed(2),
                        recall: res.report[key]["recall"].toFixed(2),
                        f1_score: res.report[key]["f1-score"].toFixed(2),
                        support:  res.report[key]["support"]
                    }
                    console.log(curr_stat)
                    stat.push(curr_stat)
                }
            }
            var final_stat = {
                stat,
                accuracy: res.report['accuracy'].toFixed(2),
                macro: res.report['macro avg'],
                weighted: res.report['weighted avg'],
            }
            setAccStat(final_stat)
        })
    }

    return(
        <div className="page-box mitigation" style={{minHeight: "100%", paddingBottom: "3rem"}}>
            <h1> Bias Mitigation </h1> 
            <p> Changing the dataset into a fairer dataset may help reducing the racial bias, but a fair dataset doesn't always happen in real settings. In this case, we could resort to mitigate the bias instead </p>
            <p> There are few concrete ways to mitigate the racial bias that may occur</p> 
            <div style={{marginBottom: "1rem", textAlign: "center"}}>
                <h2> Current Result </h2>
                <div style={{height: "350px"}}>
                    {display_pred_res(accStat)}
                </div>
            </div>
            
            <h2 className='text-center'> Select a phase to add mitigation </h2>
            <Row className='text-center phase-choice'>
                <Col md={{span: 2, offset: 3}}> <img src={datasetSrc} alt='' id="dataset" onClick={(e) => choose_phase(e.currentTarget.id)}/> </Col>
                <Col md={2}> <img src={classifierSrc} alt='' id="classifier" onClick={(e) => choose_phase(e.currentTarget.id)}/> </Col>
                <Col md={2}>  <img src={predictSrc} alt='' id="predict" onClick={(e) => choose_phase(e.currentTarget.id)}/> </Col>
            </Row>
        </div>
    )
    
}

export default Mitigation