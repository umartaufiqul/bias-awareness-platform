import React, {Component} from "react"
import Dropdown from 'react-bootstrap/Dropdown'

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

    componentDidMount() {
        const parsed = window.location.href.split("=");
        this.setState({algo: parsed[1]})
        console.log(parsed[1])
    }

    render() {
        return(
            <div id='comparison'>
                <h2 className="text-center"> Comparison </h2> 
                <div className='compare'>
                    <div className="before-mitigate">
                        <h3> Without bias mitigation </h3>
                    </div>
                    <div className="after-mitigate">
                        <h3> Bias Mitigation: </h3>
                        {/* <div className="bias-dd"> 
                            <button className="bias-dd-btn" onClick={this.showDropdown}> Select a mitigation</button>
                            <div className={"bias-dd-content " + this.state.bias_dropdown}>
                                <p> Tes 1</p>
                                <p> Tes 2</p>
                                <p> Tes 3</p> 
                            </div>
                        </div> */}
                        <Dropdown className='algo-dropdown'>
                            <Dropdown.Toggle> {this.state.algo} </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item> Tes1 </Dropdown.Item>
                                <Dropdown.Item> Tes1 </Dropdown.Item>
                                <Dropdown.Item> Tes1 </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="before-mitigate">
                        <img src={require("../images/graph.png")} className="graph-box" alt="graph"/>
                    </div>
                    <div className="after-mitigate">
                        <img src={require("../images/graph.png")} className="graph-box" alt="graph"/>
                    </div>
                    <ul className="legend-box">
                        <li id="legend-toxic"> Toxic text </li>
                        <li id="legend-nontoxic"> Non-toxic text </li>
                    </ul>
                    <div className="before-mitigate">
                        <div className="result-box">
                            <h2> Result </h2>
                            <ul>
                                <li> Precision: 0.76 </li>
                                <li> Recall: 0.89 </li>
                                <li> Fairness metrics: ___ </li>
                            </ul>
                        </div>
                    </div>
                    <div className="after-mitigate">
                        <div className="result-box">
                            <h2> Result </h2>
                            <ul>
                                <li> Precision: 0.76 </li>
                                <li> Recall: 0.89 </li>
                                <li> Fairness metrics: ___ </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Compare