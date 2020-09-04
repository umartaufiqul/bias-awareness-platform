import React, { Component } from "react"

class VisualModelNew extends Component {
    render() {
        return(
            <div className='visual-dataset visual-model-new'>
                <ul>
                    <li> <input type='radio' name ='model' value='model1' defaultChecked/> Model 1</li>
                    <li> <input type='radio' name ='model' value='model2'/> Model 2 </li>
                    <li> <input type='radio' name ='model' value='model3'/> Model 3 </li>
                </ul>
            </div>
        )
    }
}

export default VisualModelNew