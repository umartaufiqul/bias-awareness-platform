import React, {Component} from "react"
import "../style/Comparison.css"
import Compare from "../components/Compare"
import Evaluate from "../components/Evaluate"

class Comparison extends Component {
    constructor(props) {
        super(props)
        this.state = {
            compare_active: "active",
            evaluate_active: ""
        }
    }

    changeContent(id) {
        console.log(id)
        if (id === "comparison-tab") {
            this.setState({compare_active: "active",evaluate_active: ""})
        } else {
            this.setState({compare_active: "",evaluate_active: "active"})
        }
    }

    returnContent() {
        if (this.state.compare_active === "active") {
            return <Compare />
        } 
        else if (this.state.evaluate_active === "active") {
            return <Evaluate />
        }
    }

    render() {
        return(
            <div className="comparison page-box">
                <h1> Comparison and Evaluation </h1>
                <p> After bias mitigation, here are the comparison between the classifier result before bias mitigation is applied and after the bias mitigation is applied.</p> 
                <ul className="choices">
                    <li className={this.state.compare_active} id="comparison-tab" onClick={(e) => this.changeContent(e.currentTarget.id)}> Comparison </li>
                    <li className={this.state.evaluate_active} id="evaluation-tab" onClick={(e) => this.changeContent(e.currentTarget.id)}> Evaluation </li>
                </ul>
                <div className="interact-container"> 
                    {this.returnContent()}
                </div>
            </div>
        )
    }
}

export default Comparison