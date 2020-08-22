import React, {Component} from "react"
import "../style/Visualization.css"
import VisualModel from "../components/VisualModel"
import VisualDataset from "../components/VisualDataset"

class Visualization extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataset_active: "active",
            model_active: "",
        }
    }

    changeActiveState(id) {
        if (id === "dataset-tab") {
            this.setState({dataset_active: "active", model_active: ""})
        } else {
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

    render() {
        return(
            <div className="visualization page-box">
                <div className="vis-header">
                    <h1> Abusive Speech Detection Result </h1> 
                </div>
                <div className="visual-container">
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
                </div>                
                <ul className="choices">
                    <li className={this.state.dataset_active} id="dataset-tab" onClick={(e) => this.changeActiveState(e.currentTarget.id)}> Dataset </li>
                    <li className={this.state.model_active} id="model-tab" onClick={(e) => this.changeActiveState(e.currentTarget.id)}> Model </li>
                </ul>
                <div className="interact-container">
                    {this.changeContent()}
                </div>
            </div>
        )
    }
}

export default Visualization