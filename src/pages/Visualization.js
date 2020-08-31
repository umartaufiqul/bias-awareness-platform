import React, {Component} from "react"
import "../style/Visualization.css"
import VisualModel from "../components/VisualModel"
import VisualDataset from "../components/VisualDataset"
import ScatterChart from "../components/ScatterChart"
import Tour from "reactour"
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock"
import {Col, Row} from "react-bootstrap"

class Visualization extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataset_active: "active",
            model_active: "",
            isTourOpen: false,
        }
    }

    changeActiveState(id) {
        console.log(id)
        if (id === "dataset-tab" && this.state.dataset_active === "") {
            this.setState({dataset_active: "active", model_active: ""})
        } else if (id === "model-tab" && this.state.model_active === ""){
            this.setState({dataset_active: "", model_active: "active"})
        }
    }

    changeContent() {
        if (this.state.dataset_active === "active") {
            return <VisualDataset />
        }
        else {
            return <VisualModel />
        }
    }

    closeTour = () => {
        this.setState({ isTourOpen: false });
      };

    componentDidMount() {
        this.setState({isTourOpen: true})
    }

    disableBody = target => disableBodyScroll(target);
    enableBody = target => enableBodyScroll(target);  

    render() {
    const steps = [
        {
            selector: '',
            content: () => (
                <div>
                    <h3 className='text-center'> Visualizing the Result </h3>
                    <p> In this step you can see the result of the model that you have made in the previous step, and also interact with the components of the process to see how it affect the fairness of a model</p> 
                </div>
            )
        },
        {
            selector: '.graph-box',
            content: () => (
                <div>
                    <h3 style={{textAlign: 'center'}}> Graph </h3> 
                    <p> This graph plot each of the feedback’s probability of being toxic against the probability of it using AAE dialect. The higher its toxic probability, the higher it chance to be classified as toxic </p>
                    <p> The higher its toxic probability, the higher it chance to be classified as toxic. On the other hand, the higher its AAE dialect probability, the higher it is to come from African American students</p>
                </div>
                )
        },
        {
            selector: '.result-box',
            content: () => (
                <div>
                    <h3 className='text-center'> Result Box </h3>
                    <p> The result box display not only the accuracy result for the model, but also the racial bias of the model </p>
                    <p> The fairness metrics is determined as how non-discriminatory is the classifier.</p>
                </div>
            )
        },
        {
            selector: '.toxic-thres',
            content: () => (
                <div onLoad={this.changeActiveState("model-tab")}>
                    <h3 className='text-center'> Toxicity Threshold </h3>
                    <p> Toxicity threshold is the decision threshold for toxic feedback. Any feedback that has toxic probability above toxic threshold is considered as toxic. </p>
                    <p> The toxicity threshold may differ between groups, depending on the constraint</p>
                </div>
            ),
        },
        {
            selector: '.constraint',
            content: () => (
                <div>
                    <h3 className='text-center'> Constraints </h3>
                    <p> Constraint affect the toxicity decision, since different constraints result in different toxicity threshold. This further lead to different level of accuracy and fairness. </p> 
                </div>
            )
        },
        {
            selector: '.question-btn',
            content: () => (
                <div>
                    <h3 className='text-center'> Explore and Observe </h3>
                    <p> There will be a few questions in the next step, so explore and observe as much as you can. </p>
                    <p> Once you’re done, click the question box on the top right corner. Don’t worry, you can go back again if you want to</p>
                </div>
            ),
            position: 'middle',
        }
    ]

        return(
            <div className="visualization page-box">
                <div className="vis-header">
                    <h1> Abusive Speech Detection Result </h1> 
                </div>
                {/* <div className="visual-container">
                    <img src={require("../images/graph.png")} className="graph-box" alt="graph"/>
                    <div className="explain-box">
                        <ul className="legend-box">
                            <li id="legend-toxic"> Toxic text </li>
                            <li id="legend-nontoxic"> Non-toxic text </li>
                        </ul>
                        <div className="result-box">
                            <h2> Result </h2>
                            <ul>
                                <li> Precision: 0.76 </li>
                                <li> Recall: 0.89 </li>
                                <li> Fairness metrics: ___ </li>
                            </ul>
                        </div>  
                    </div>
                </div>                 */}
                <Row className='visual-container'>
                    <Col md={{span:4, offset: 2}}> 
                    {/* <img src={require("../images/graph.png")} className="graph-box" alt="graph"/>  */}
                    <ScatterChart />
                    </Col>
                    <Col md={{span:3, offset:1}}>
                        <ul className="legend-box">
                            <li id="legend-toxic"> Toxic text </li>
                            <li id="legend-nontoxic"> Non-toxic text </li>
                        </ul>
                        <div className="result-box">
                            <h2> Result </h2>
                            <ul>
                                <li> Precision: 0.76 </li>
                                <li> Recall: 0.89 </li>
                                <li> Fairness metrics: ___ </li>
                            </ul>
                        </div> 
                    </Col>
                </Row>
                <ul className="choices">
                    <li className={this.state.dataset_active} id="dataset-tab" onClick={(e) => this.changeActiveState(e.currentTarget.id)}> Dataset </li>
                    <li className={this.state.model_active} id="model-tab" onClick={(e) => this.changeActiveState(e.currentTarget.id)}> Model </li>
                </ul>
                <div className="interact-container">
                    {this.changeContent()}
                </div>
                <Tour 
                    steps={steps}
                    isOpen={this.state.isTourOpen}
                    onRequestClose={this.closeTour}
                    onAfterOpen={this.disableBody}
                    onBeforeClose={this.enableBody}
                />
            </div>
        )
    }
}

export default Visualization