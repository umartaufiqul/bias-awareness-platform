import React, {useState, useEffect} from "react"

const arrow_up = require("../../icons/up_arrow.svg")

const PredictionMitigation = () => {
    const [method1Active, setMethod1Active] = useState(true)

    function handle_method_state(src, new_state) {
        if (src === 1) {
            setMethod1Active(new_state)
        }
    }

    return (
        <div className="page-box text-center">
            <h2 style={{marginBottom: "1rem"}}> Prediction Mitigation </h2>
            <button className="btn btn-green" style={{position: "absolute", right: "5rem"}}> Go to Code </button>
            <div style={{textAlign: "left"}}>
                <h3 style={{marginBottom: "1rem"}}> Mitigation Methods </h3>
                <div className="method-header" onClick={() => handle_method_state(1, !method1Active)}>
                    <span> Method 1: Reject Option Classifier </span>
                    <img src={arrow_up} style={{cursor: "pointer"}} className={method1Active? '': 'rotate'}></img>
                </div>
                <div style={{margin: "0rem 3rem"}} className={method1Active? '' : 'd-none'}>
                    <p> Explanation: Lorem ipsum dolor sit amet, falli accusata invenire ex pri. Alia meliore ut vim, ne quot menandri democritum sea, cu noster possim epicurei mea. Vix ne exerci detraxit neglegentur, an iisque tamquam est. Cum in mazim similique comprehensam, qualisque urbanitas est id. Ne erroribus forensibus dissentiet eos, mei dicunt tritani accusam an. </p>

                    <p> His ei nobis singulis. Duis salutandi concludaturque his an, eum at omnis soleat accusamus. Ea vel veniam definitiones. Eu eum nisl prodesset, an cibo expetenda has, ex eum dicam suavitate. Qui ex graece alienum torquatos. Errem numquam qui no, ex duis philosophia vel.</p>

                    <p> Sample Code: </p>
                    <pre style={{margin: "0 2rem", backgroundColor: "#E0DEDE", padding: "1rem"}}>
                        <code>
                            a = 9 <br/>
                            b = 10 <br/>
                            print(a + b)
                        </code>
                    </pre>
                </div>
                <div className="method-header">
                    Method 2: _______
                </div>
                <div className="method-header">
                    Method 3: _______
                </div>
            </div>
            
            <button className='btn btn-green' style={{margin: "1.5rem auto"}}> SAVE </button>
        </div>
    )
}

export default PredictionMitigation;