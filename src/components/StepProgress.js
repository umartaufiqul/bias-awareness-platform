import React, {Component} from "react"
import "../style/StepProgress.css"
import { Link } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"


class StepProgress extends Component {
    constructor(props){
        super(props)
        this.progressRef = React.createRef()
        this.state = {
            current_step: this.props.current_step,
            first_step: "bar-icon-uncompleted",
            second_step: "bar-icon-uncompleted",
            third_step: "bar-icon-uncompleted",
            fourth_step: "bar-icon-uncompleted",
            fifth_step: "bar-icon-uncompleted",
            refresh: false,
        }
        this.createProgress = this.createProgress.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentStep !== this.props.current_step) {
          this.setState({current_step: nextProps.current_step, refresh: true});
        }
      }

    componentDidUpdate() {
        console.log(this.state.current_step)
        if (this.state.refresh) {
            this.updateProgress()
        }
    }

    componentDidMount() {
        console.log(this.props)
        this.updateProgress()
    }

    goToEvaluation() {
        window.location.href='/bias-awareness-platform/#/evaluation'
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
        console.log(updateClass)
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
        const str = this.props.location.pathname
        var create_model = 
        <li>
            <Link to="/code" style={{color: 'black'}}>
                <div className={'last-cat ' + this.state.first_step}>
                    {/* <img src={require("../icons/check.svg")} alt="" height="32" width="32" /> */}
                </div>
                <p> Create model </p>
            </Link>
        </li>

        var visualize_result = 
        <li>
            <Link to="/visualization" style={{color: 'black'}}>
                <div className={this.state.second_step}></div>
                <p> Result visualization </p> 
            </Link>
        </li>

        var evaluation = 
        <li>
            <Link to="/evaluation" style={{color: 'black'}}>
                <div className={this.state.third_step}></div>
                <p> Evaluation </p> 
            </Link>
        </li>

        var bias_mitigate = 
        <li> 
            <Link to="/mitigation" style={{color: 'black'}}>
                <div className={this.state.fourth_step}></div>
                <p> Bias mitigation </p>
            </Link>
        </li>

        var comparison_eval = 
        <li> 
            <Link to="/comparison" style={{color: 'black'}}>
                <div className={this.state.fifth_step}></div>
                <p> Comparison and Evaluation </p>
            </Link>
        </li> 
        var question_btn = ""
        if (str.includes("visualization")) {
            question_btn = 
            <div className='question-btn' onClick={this.goToEvaluation}>
                Question
            </div> 
        }
        var progress = 
        <Navbar className="step-progress" expand="lg">
            <Navbar.Brand>{this.getCurrentStep(this.state.current_step)}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className='text-center'>
            <ul className='step-ul'>                
            {create_model}
            {visualize_result}
            {evaluation}
            {bias_mitigate}
            {comparison_eval}
            </ul>
            <ol className='step-mini'>
                <li> <Link to="/code" style={{color: 'black'}}>
                Create Model </Link> </li>
                <li> <Link to="/visualization" style={{color: 'black'}}> Result Visualization</Link> </li>
                <li> <Link to="/evaluation" style={{color: 'black'}}> Evaluation</Link> </li>
                <li> <Link to="/mitigation" style={{color: 'black'}}> Bias Mitigation </Link></li>
                <li> <Link to="/comparison" style={{color: 'black'}}> Comparison and Evaluation </Link></li> 
            </ol>
            {question_btn}
            </Navbar.Collapse>
        </Navbar>
        
        return progress
    }

    getCurrentStep(current_step) {
        if (current_step === 1) {
            return <h4 className='current-step-mini'> Create Model</h4>
        }
        if (current_step === 2) {
            return <h4 className='current-step-mini'> Result Visualization</h4>
        }
        if (current_step === 3) {
            return <h4 className='current-step-mini'> Evaluation</h4>
        }
        if (current_step === 4) {
            return <h4 className='current-step-mini'> Bias Mitigation</h4>
        }
        if (current_step === 5) {
            return <h4 className='current-step-mini'> Comparison and Evaluation</h4>
        }
    }

    render() {
        return(
            this.createProgress()
        )
    }
}

export default StepProgress