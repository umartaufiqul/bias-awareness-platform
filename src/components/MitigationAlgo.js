import React, {Component} from "react"


class MitigationAlgo extends Component {
    chooseAlgo() {

        const PredictionsAlgo = (
            <tr>
                <td onClick={(e) => this.handleClick(e.currentTarget.id)} id='reject-option'> 
                    <h3> Reject Option Classification </h3> 
                    <p> Changes prediction result from a classifier to make it fairer </p>     
                </td>
                <td onClick={(e) => this.handleClick(e.currentTarget.id)} id='equal-odd'> 
                    <h3> Equalized odds </h3>
                    <p> Modify the predicted labels using an optimized scheme </p> 
                </td>
                <td onClick={(e) => this.handleClick(e.currentTarget.id)} id='calibrated-odd'> 
                    <h3> Calibrated Equalized odds </h3>
                    <p> Optimize over calibrated score to make the prediction fairer </p> 
                </td>
            </tr>
        )

        const ClassifierAlgo = (
            <tr>
                <td onClick={(e) => this.handleClick(e.currentTarget.id)} id='advers-debias'> 
                    <h3> Adversarial Debiasing </h3> 
                    <p> Use adversarial technique to maximize accuracy and reduce evidence of protected attributes </p>     
                </td>
                <td onClick={(e) => this.handleClick(e.currentTarget.id)} id='prejudice-remove'> 
                    <h3> Prejudice Remover </h3>
                    <p> Adds a discrimination-aware regularization term to learning objective </p> 
                </td>
                <td onClick={(e) => this.handleClick(e.currentTarget.id)} id='meta-fair'> 
                    <h3> Meta Fair Classifier </h3>
                    <p> Take fairness metrics as a part of input and optimize based on the metrics </p> 
                </td>
            </tr>
        )

        const DatasetAlgo = (
            <tr>
                <td onClick={(e) => this.handleClick(e.currentTarget.id)} id='optimize-pre'> 
                    <h3> Optimized Pre-Processing </h3> 
                    <p> Modifies the training data features and label </p>     
                </td>
                <td onClick={(e) => this.handleClick(e.currentTarget.id)} id='reweighing'> 
                    <h3> Reweighing </h3>
                        <p> Modifies the weight of different training examples </p> 
                </td>
                <td onClick={(e) => this.handleClick(e.currentTarget.id)} id='disparate'> 
                    <h3> Disparate Impact Remover </h3>
                        <p> Edit features value to improve group fairness </p> 
                </td>
                <td onClick={(e) => this.handleClick(e.currentTarget.id)} id='fair-learning'> 
                    <h3> Fair Learning Representation </h3>
                        <p> Obfuscating information about the protected attributes </p> 
                </td>
            </tr>
        )

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

    handleClick(algo) {
        window.location.href = '/bias-awareness-platform/#/comparison?algo=' + algo
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