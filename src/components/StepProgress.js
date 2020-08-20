import React, {Component} from "react"
import "../style/StepProgress.css"


class StepProgress extends Component {
    constructor(props){
        super(props)
        this.progressRef = React.createRef()
        this.state = {
            current_step: this.props.currentStep,
            first_step: "bar-icon-uncompleted",
            second_step: "bar-icon-uncompleted",
            third_step: "bar-icon-uncompleted",
            fourth_step: "bar-icon-uncompleted",
            fifth_step: "bar-icon-uncompleted",
            refresh: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentStep !== this.props.currentStep) {
          this.setState({current_step: nextProps.currentStep, refresh: true});
        }
      }

    componentDidUpdate() {
        console.log(this.state.current_step)
        if (this.state.refresh) {
            this.updateProgress()
        }
    }

    componentDidMount() {
        this.updateProgress()
    }

    updateProgress() {
        var updateClass = ["bar-icon-uncompleted", "bar-icon-uncompleted", "bar-icon-uncompleted", "bar-icon-uncompleted", "bar-icon-uncompleted"]
        for (var i = 0; i < 5; i++) {
            if ((i + 1) < this.state.current_step) {
                updateClass[i] = "bar-icon-completed"
            }
            else if ((i + 1) === this.state.current_step) {
                updateClass[i] = "bar-icon"
            }
        }
        this.setState({
            first_step: updateClass[0],
            second_step: updateClass[1],
            third_step: updateClass[2],
            fourth_step: updateClass[3],
            fifth_step: updateClass[4],
            refresh: false,
        })
    }

    createProgress() {
        var create_model = 
        <li>
            <div className={'last-cat ' + this.state.first_step} >
                {/* <img src={require("../icons/check.svg")} alt="" height="32" width="32" /> */}
            </div>
            <p> Create model </p>
        </li>

        var visualize_result = 
        <li>
            <div className={this.state.second_step}></div>
            <p> Result visualization </p> 
        </li>

        var evaluation = 
        <li>
            <div className={this.state.third_step}></div>
            <p> Evaluation </p> 
        </li>

        var bias_mitigate = 
        <li> 
            <div className={this.state.fourth_step}></div>
            <p> Bias mitigation </p>
        </li>

        var comparison_eval = 
        <li> 
            <div className={this.state.fifth_step}></div>
            <p> Comparison and Evaluation </p>
        </li> 
        var progress = 
        <div className="step-progress">
            <ul>                
            {create_model}
            {visualize_result}
            {evaluation}
            {bias_mitigate}
            {comparison_eval}
            </ul>
        </div>
        
        return progress
    }

    render() {
        return(
            this.createProgress()
        )
    }
}

export default StepProgress