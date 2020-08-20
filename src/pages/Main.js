import React, {Component} from "react"
import { Switch, Route } from "react-router-dom"
import CodeNotebook from "./CodeNotebook"
import StepProgress from "../components/StepProgress"
import Visualization from "./Visualization"

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current_step: 1
        }
    }

    componentDidUpdate() {
        console.log("updated in parent")
    }

    componentDidMount() {
        console.log(this.props.location)
        this.updateCurrentStep()
    }

    updateCurrentStep() {
        var str = this.props.location.pathname
        if (str.includes("/bias-awareness/visualization")) {
            this.setState({
                current_step: 2
            })
        }
        else if (str.includes("/bias-awareness/evaluation")){
            this.setState({
                current_step: 3
            })
        }
    }

    render() {
        return(
        <div>
            <StepProgress currentStep={this.state.current_step}/>
            <Switch>
                <Route exact path='/bias-awareness' component={CodeNotebook}></Route>
                <Route path='/bias-awareness/visualization' component={Visualization}></Route>
                <Route exact path='/bias-awareness/evaluation' component={Visualization}></Route>
            </Switch>
        </div>
        )
    }
    
}

export default Main