import React, {Component} from "react"
import "../style/Visualization.css"
import ScatterChart from "../components/ScatterChart"
import VisualDataset from "../components/VisualDataset"
import VisualModelNew from "../components/VisualModelNew"

class VisualizationNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataset_active: "active",
            model_active: "",
            words_input: "",
            words_list: []
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputDown = this.handleInputDown.bind(this)
    }

    changeActiveState(id) {
        console.log(id)
        if (id === "dataset-tab" && this.state.dataset_active === "") {
            this.setState({dataset_active: "active", model_active: ""})
        } else if (id === "model-tab" && this.state.model_active === ""){
            this.setState({dataset_active: "", model_active: "active"})
        }
    }

    changeContent() {
        if (this.state.dataset_active === "active") {
            return <VisualDataset />
        }
        else {
            return <VisualModelNew />
        }
    }

    handleInputChange(e) {
        this.setState({words_input: e.target.value})
    }

    handleInputDown(e) {
        if (e.keyCode == 13) {
            e.preventDefault()
            const {value} = e.target
            console.log(value)
            this.setState(state => ({
                words_list: [...state.words_list, value],
                words_input: ""
            }))
        }
    }

    handleRemove(index) {
        return () => {
            this.setState( state => ({
                words_list: state.words_list.filter((item, i) => i !== index)
            }))
        }
    }

    render() {
        const word_style = {
            backgroundColor: "grey"
        }
        return(
            <div className='visualization-new'>
                <div className='visualization-new-container'>
                    <div className='graph-left'>
                        <h1> Abusive Speech Detection Result </h1>
                        <div className='scatter-chart'>
                            <ScatterChart width={10} height={10}/>
                        </div>
                        <div className='associated-words'>
                            <form className='form-inline'>
                            <label> Associated words: </label>
                            <input className="form-control ml-4" type="text" value={this.state.words_input}onChange={this.handleInputChange} onKeyDown={this.handleInputDown}></input>
                            <button type='submit' className='btn btn-secondary ml-4'> Reload </button>
                            </form>
                            <ul className='word-container'>
                                {this.state.words_list.map((item, i) => 
                                    <li key={i} className='word-tag'>
                                        {item}
                                        <img src={require('../icons/x-mark.svg')} alt='' onClick={this.handleRemove(i)}/>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className='interactive-right'>
                        <div id='interactive-controller'>
                            <div className='d-flex interact-tab'> 
                                <div className={'interactive-choice '+this.state.dataset_active} id="dataset-tab" onClick={(e) => this.changeActiveState(e.currentTarget.id)}> DATASET </div>
                                <div className={'interactive-choice '+this.state.model_active} id="model-tab" onClick={(e) => this.changeActiveState(e.currentTarget.id)}> MODEL </div>
                            </div>
                            <div className="interact-container">
                                {this.changeContent()}
                            </div>
                            <div className='load-btn'>
                                <button type='button' className="btn btn-secondary"> Build Model </button>
                            </div>
                        </div>
                        <div id='visual-result'>
                            <h3> Result </h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VisualizationNew