import React, {Component} from "react"
import "../style/Visualization.css"
import { Switch, Route, Link } from "react-router-dom"
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
                    <li className={this.state.dataset_active} id="dataset-tab" onClick={(e) => this.changeActiveState(e.currentTarget.id)}> <Link to='/visualization/dataset'> Dataset </Link></li>
                    <li className={this.state.model_active} id="model-tab" onClick={(e) => this.changeActiveState(e.currentTarget.id)}> <Link to='/visualization/model'> Model </Link></li>
                </ul>
                <div className="interact-container">
                    <Switch>
                        <Route exact path='/visualization' component={VisualDataset} />
                        <Route path='/visualization/dataset' component={VisualDataset} />
                        <Route path='/visualization/model' component={VisualModel} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Visualization