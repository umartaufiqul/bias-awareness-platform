import React, {Component} from "react"
import { Switch, Route } from "react-router-dom"
import CodeNotebook from "./CodeNotebook"
import StepProgress from "../components/StepProgress"
import Visualization from "./Visualization"
import Evaluation from "./Evaluation"
import Mitigation from "./Mitigation"
import Comparison from "./Comparison"
import VisualizationNew from "./VisualizationNew"

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current_step: 1,
            curr_time: '',
        }
    }

    componentDidUpdate() {
        console.log("updated in parent")
        this.updateCurrentStep()
    }

    componentDidMount() {
        console.log(this.props.location)
        this.updateCurrentStep()
        // this.getCurrTime()
    }

    // getCurrTime() {
    //     fetch('/time').then(res => res.json()).then(data => {
    //         console.log(data.time)
    //         this.setState({curr_time: data.time})})
    // }

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
        else if (str.includes("comparison") && this.state.current_step !== 5) {
            this.setState({current_step: 5})
        }
        else if (str.includes("fin") && this.state.current_step !== 6) {
            this.setState({current_step: 6})
        }
    }

    render() {
        return(
        <div className='main-application'>
            {/* <Route path='/' render={(props) => <StepProgress {...props} current_step={this.state.current_step} />} /> */}
            {/* <p> Current time {this.state.curr_time} </p> */}
            {/* <StepProgress currentStep={this.state.current_step}/> */}
            <Switch>
                <Route path='/code' component={CodeNotebook}></Route>
                <Route path='/visualization' component={Visualization}></Route>
                <Route path='/evaluation' component={Evaluation}></Route>
                <Route path='/mitigation' component={Mitigation}></Route>
                <Route path='/comparison' component={Comparison}></Route>
                <Route path='/test' component={VisualizationNew}></Route>
            </Switch>
        </div>
        )
    }
    
}

export default Main