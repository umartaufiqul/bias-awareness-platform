import React, {Component} from "react"
import "../style/CodeNotebook.css"
import Button from "../components/Button"

class CodeNotebook extends Component {
    render() {
        return(
            <div className="page-box">
                <h1 className="text-center"> Build the Model </h1>
                <p> Build the classifier to detect the abusive and toxic feedbacks. For the purpose of the evaluation, use the variable <span> dataset </span> as the initial data</p>
                <h2> Data Preprocessing </h2>
                <textarea rows="10"/>
                <h2> Feature Generation </h2>
                <textarea rows="10"/>
                <h2> Running the Model </h2>
                <textarea rows="5" cols="50"/>
                <Button name='Build' link='/bias-awareness-platform/#/visualization' className="text-center mt"/>
            </div>
        )
    }
}

export default CodeNotebook