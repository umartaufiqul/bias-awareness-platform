import React, { Component } from "react"

class VisualDataset extends Component {
    render() {
        return(
            <div className='visual-dataset'>
                <ul>
                    <li> <input type='radio' name ='dataset' value='data1' defaultChecked/> Dataset 1</li>
                    <li> <input type='radio' name ='dataset' value='data2'/> Dataset 2 </li>
                    <li> <input type='radio' name ='dataset' value='data3'/> Dataset 3 </li>
                </ul>
            </div>
        )
    }
}

export default VisualDataset