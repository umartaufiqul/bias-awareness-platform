import React, {Component} from "react"
import Button from "./Button"

class Evaluate extends Component {
    render() {
        return(
            <div className="evaluate">
                <h5> Try changing the bias mitigation method several times. You can change the bias mitigation method directly on the comparison, or going back to the previous page using the mitigation button the top right corner. For each form, use exactly one bias mitigation. You can submit the form multiple times</h5>
                <form>
                    <label> 1. Which bias mitigation do you use </label>
                    <textarea />
                    <label> 2. Is there any increase or decrease in fairness after the bias mitigation is applied? </label>
                    <textarea />
                    <label> 3. Is there any increase or decrease in accuracy after the bias mitigation is applied </label>
                    <textarea />
                    <label> 4. Based on the accuracy-fairness tradeoff, would you use this bias mitigation algorithm for this scenario in particular?  </label>
                    <textarea />
                </form>
                <Button name="Submit" link="/bias-awareness-platform/#/fin" className="text-center"/>
            </div>
        )
    }
}

export default Evaluate