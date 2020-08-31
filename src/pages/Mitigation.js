import React, {Component} from "react"
import "../style/Mitigation.css"
import MitigationAlgo from "../components/MitigationAlgo"
import {Col, Row} from "react-bootstrap"

const dataset_fill = require('../icons/dataset_fill.svg')
const dataset = require('../icons/dataset.svg')
const classifier_fill = require('../icons/classifier_fill.svg')
const classifier = require('../icons/classifier.svg')
const predict_fill = require('../icons/prediction_fill.svg')
const predict = require('../icons/prediction.svg')

class Mitigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataset_src: dataset_fill,
            classifier_src: classifier_fill,
            predict_src: predict_fill,
            selected: "none"
        }
    }

    choosePhase(id) {
        console.log(id)
        if (id === "dataset") {
            this.setState({dataset_src: dataset_fill, classifier_src: classifier, predict_src: predict, selected: "dataset"})
        }
        else if (id === "classifier") {
            this.setState({dataset_src: dataset, classifier_src: classifier_fill, predict_src: predict, selected: "classifier"})
        }
        else {
            this.setState({dataset_src: dataset, classifier_src: classifier, predict_src: predict_fill, selected: "predict"})
        }
    }

    render() {
        return(
            <div className="page-box mitigation">
                <h1> Bias Mitigation </h1> 
                <p> Changing the dataset into a fairer dataset may help reducing the racial bias, but a fair dataset doesn't always happen in real settings. In this case, we could resort to mitigate the bias instead </p>
                <p> There are few concrete ways to mitigate the racial bias that may occur</p> 
                <h2 className='text-center'> Select a phase to add mitigation </h2>
                <Row className='text-center phase-choice'>
                    <Col md={{span: 2, offset: 3}}> <img src={this.state.dataset_src} alt='' id="dataset" onClick={(e) => this.choosePhase(e.currentTarget.id)}/> </Col>
                    <Col md={2}> <img src={this.state.classifier_src} alt='' id="classifier" onClick={(e) => this.choosePhase(e.currentTarget.id)}/> </Col>
                    <Col md={2}>  <img src={this.state.predict_src} alt='' id="predict" onClick={(e) => this.choosePhase(e.currentTarget.id)}/> </Col>
                </Row>
                <MitigationAlgo selected={this.state.selected}/>
            </div>
        )
    }
}

export default Mitigation