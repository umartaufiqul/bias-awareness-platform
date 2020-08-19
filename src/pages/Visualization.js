import React, {Component} from "react"

class Visualization extends Component {
    render() {
        return(
            <div className="visualization">
                <div className="visual-container">
                    <div className="graph-box"> This is the place for the graph </div>
                    <div className="result-box"> This is the result box </div>
                </div>
                <div className="interact-container">
                    Test
                </div>
            </div>
        )
    }
}

export default Visualization