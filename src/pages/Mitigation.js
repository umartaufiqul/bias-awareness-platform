import React, {useState} from "react"
import "../style/Mitigation.css"
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

    function choose_phase(id) {
        setDatasetSrc(dataset)
        setClassifierSrc(classifier)
        setPredictSrc(predict)
        if (id === "dataset") { setDatasetSrc(dataset_fill) }
        else if (id === "classifier") { setClassifierSrc(classifier_fill) }
        else { setPredictSrc(predict_fill) }
    }
    return(
        <div className="page-box mitigation" style={{minHeight: "100%"}}>
            <h1> Bias Mitigation </h1> 
            <p> Changing the dataset into a fairer dataset may help reducing the racial bias, but a fair dataset doesn't always happen in real settings. In this case, we could resort to mitigate the bias instead </p>
            <p> There are few concrete ways to mitigate the racial bias that may occur</p> 
            <div style={{marginBottom: "1rem"}}>
                <h2> Current Result </h2>
                <div style={{height: "350px", backgroundColor: "grey"}}>

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