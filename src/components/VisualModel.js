import React, { Component } from "react"

class VisualModel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cauc_thres: "active",
            aae_thres: "active",
        }
    }

    changeThreshold(id) {
        if (id === "cauc") {
            if (this.state.cauc_thres === "") {
                this.setState({cauc_thres: "active"})
            }
            else {
                this.setState({cauc_thres: ""})
            }
        }
        else {
            if (this.state.aae_thres === "") {
                this.setState({aae_thres: "active"})
            }
            else {
                this.setState({aae_thres: ""})
            }
        }
    }

    render() {
        return (
            <div className='visual-model'>
                <div className='constraint'>
                    <h3> Constraint </h3>
                    <ul>
                        <li> <input type='radio' name='constraint' value='1' defaultChecked/> Race blind </li> 
                        <li> <input type='radio' name='constraint' value='2' /> Demographic parity </li> 
                        <li> <input type='radio' name='constraint' value='3' /> Equal Opportunity </li> 
                        <li> <input type='radio' name='constraint' value='4' /> Equalized odds </li> 
                    </ul>
                </div>
                <div className='toxic-thres'>
                    <h3> Toxicity Threshold </h3>
                    <div className='check-group'>
                        <div className={"check-box " + this.state.cauc_thres} id="cauc" onClick={e => this.changeThreshold(e.target.id)}> </div> <span> Caucasian </span> 
                    </div>
                    <div className='check-group'>
                        <div className={"check-box " + this.state.aae_thres} id="aae" onClick={e => this.changeThreshold(e.target.id)}> </div> <span> African American </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default VisualModel