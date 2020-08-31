import React, {Component} from "react"
import Dropdown from 'react-bootstrap/Dropdown'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ScatterChart from "./ScatterChart"


const dict = {'reject-option': 'Reject Option Classification', 'equal-odd': 'Equalized Odds', 'calibrated-odd': 'Calibrated Equalized Odds', 'advers-debias': 'Adversarial Debiasing', 'prejudice-remove': 'Prejudice Remover', 'meta-fair': 'Meta Fair Classifier', 'optimize-pre': 'Optimized Pre-Processing', 'reweighing': 'Reweighing', 'disparate': 'Disparate Impact Remover', 'fair-learning': 'Fair Learning Representation'}

class Compare extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bias_dropdown: "hide",
            algo: "Select your algo"
        }
        this.showDropdown = this.showDropdown.bind(this)
    }

    showDropdown() {
        if (this.state.bias_dropdown === "hide") {
            this.setState({bias_dropdown: "show"})
        }
        else if (this.state.bias_dropdown === "show") {
            this.setState({bias_dropdown: "hide"})
        }
    }

    changeAlgo(class_id) {
        window.location.href='/bias-awareness-platform/#/comparison?algo=' + class_id
        this.setState({algo: dict[class_id]})
    }

    componentDidMount() {
        const parsed = window.location.href.split("=");
        if (parsed[1] === undefined) {
            this.setState({algo: "Choose the mitigation algorithm..."})
        }
        else {
            this.setState({algo: dict[parsed[1]]})
        }
    }

    iterateAlgoList() {
        var list = []
        for (var val in dict) {
            list.push([val, dict[val]])
        }
        return list.map((algo) => <Dropdown.Item id={algo[0]} onClick={(e) => this.changeAlgo(e.currentTarget.id)}>{algo[1]}</Dropdown.Item>)
    }

    render() {
        return(
            <div id='comparison'>
                <h2 className="text-center"> Comparison </h2> 
                <Row className='compare'>
                    <Col className='text-center algo-half'> 
                        <h3> Without bias mitigation </h3> 
                        {/* <img src={require("../images/graph.png")} className="graph-box" alt="graph"/> */}
                        <ScatterChart />
                        <div className="result-box">
                            <h2> Result </h2>
                            <ul>
                                <li> Precision: 0.76 </li>
                                <li> Recall: 0.89 </li>
                                <li> Fairness metrics: ___ </li>
                            </ul>
                        </div>
                    </Col>
                    <Col className='text-center algo-half'> 
                        <h3 className='algo-heading'> Bias Mitigation: </h3>
                        <Dropdown className='algo-dropdown'>
                            <Dropdown.Toggle> {this.state.algo} </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {this.iterateAlgoList()}
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <img src={require("../images/graph.png")} className="graph-box" alt="graph"/> */}
                        <ScatterChart />
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
            </div>
        )
    }
}

export default Compare