import React, {Component} from "react"

const DatasetAlgo = (
    <tr>
        <td> 
            <h3> Optimized Pre-Processing </h3> 
            <p> Modifies the training data features and label </p>     
        </td>
        <td> 
            <h3> Reweighing </h3>
                <p> Modifies the weight of different training examples </p> 
        </td>
        <td> 
            <h3> Disparate Impact Remover </h3>
                <p> Edit features value to improve group fairness </p> 
        </td>
        <td> 
            <h3> Fair Learning Representation </h3>
                <p> Obfuscating information about the protected attributes </p> 
        </td>
    </tr>
)

const ClassifierAlgo = (
    <tr>
        <td> 
            <h3> Adversarial Debiasing </h3> 
            <p> Use adversarial technique to maximize accuracy and reduce evidence of protected attributes </p>     
        </td>
        <td> 
            <h3> Prejudice Remover </h3>
            <p> Adds a discrimination-aware regularization term to learning objective </p> 
        </td>
        <td> 
            <h3> Meta Fair Classifier </h3>
            <p> Take fairness metrics as a part of input and optimize based on the metrics </p> 
        </td>
    </tr>
)

const PredictionsAlgo = (
    <tr>
        <td> 
            <h3> Reject Option Classification </h3> 
            <p> Changes prediction result from a classifier to make it fairer </p>     
        </td>
        <td> 
            <h3> Equalized odds </h3>
            <p> Modify the predicted labels using an optimized scheme </p> 
        </td>
        <td> 
            <h3> Calibrated Equalized odds </h3>
            <p> Optimize over calibrated score to make the prediction fairer </p> 
        </td>
    </tr>
)

class MitigationAlgo extends Component {
    chooseAlgo() {
        if (this.props.selected === "dataset") {
            return DatasetAlgo
        }
        else if (this.props.selected === "classifier") {
            return ClassifierAlgo
        }
        else if (this.props.selected === "predict") {
            return PredictionsAlgo
        }
    }

    render(){ 
        return(
            <div className='dataset-algo text-center'>
                <table className='algo-title text-center'> 
                    <tbody>
                        {this.chooseAlgo()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MitigationAlgo