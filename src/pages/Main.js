import React, {Component} from "react"
import { Switch, Route } from "react-router-dom"
import CodeNotebook from "./CodeNotebook"
import StepProgress from "../components/StepProgress"
import Visualization from "./Visualization"
import Evaluation from "./Evaluation"
import Mitigation from "./Mitigation"

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current_step: 1,
        }
    }

    componentDidUpdate() {
        console.log("updated in parent")
        this.updateCurrentStep()
    }

    componentDidMount() {
        console.log(this.props.location)
        this.updateCurrentStep()
    }

    updateCurrentStep() {
        var str = this.props.location.pathname
        if (str.includes("visualization") && this.state.current_step !== 2 ) {
            this.setState({
                current_step: 2,
            })
        }
        else if (str.includes("evaluation")  && this.state.current_step !== 3){
            this.setState({
                current_step: 3,
            })
        }
        else if (str.includes("mitigation") && this.state.current_step !== 4) {
            this.setState({current_step: 4})
        }
    }

    render() {
        return(
        <div>
            <Route path='/' render={(props) => <StepProgress {...props} current_step={this.state.current_step} />} />
            {/* <StepProgress currentStep={this.state.current_step}/> */}
            <Switch>
                <Route path='/code' component={CodeNotebook}></Route>
                <Route path='/visualization' component={Visualization}></Route>
                <Route exact path='/evaluation' component={Evaluation}></Route>
                <Route path='/mitigation' component={Mitigation}></Route>
            </Switch>
        </div>
        )
    }
    
}

export default Main