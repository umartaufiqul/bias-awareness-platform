import React, {Component} from "react"
import "../style/Evaluation.css"
import Button from "../components/Button"

class Evaluation extends Component {
    render() {
        return(
            <div className="evaluation page-box">
                <h1> Evaluation and Questions </h1>
                <p> After building the model and see the visualization of the result, here are some questions that you need to answer</p> 
                <p> In case you need to see the visualization again, you can click the result button on the right corner </p> 
                <form>
                    <label> 1. Based on the visualization and the result, do you find any noteworthy finding? What do you think cause this? </label>
                    <textarea />
                    <label> 2. Once you try several other datasets, did you notice any different between datasets? What do you think cause this? </label>
                    <textarea />
                    <label> 3. Which dataset do you think is better out of the ones that you try? Why do you think so? </label>
                    <textarea />
                    <label> 4. From the definitions of the metrics that are shown in the "model" tab, which one do you think is the fairest for both groups? Why?  </label>
                    <textarea />
                    <label> 5. Try and change the metrics several times. Did you notice any changes? (e.g in term of distribution and accuracy) </label>
                    <textarea />
                    <label> 6. Now that you've tried several metrics, which one do you think is the fairest for both groups? Why? </label>
                    <textarea />
                </form>
                <div className='text-center'>
                    <Button name='Submit' link='/bias-awareness-platform/#/mitigation'/>
                </div>
            </div>
        )
    }
}

export default Evaluation