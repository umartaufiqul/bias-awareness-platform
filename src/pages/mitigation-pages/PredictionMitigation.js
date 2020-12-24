import { parse } from "papaparse"
import React, {useState, useEffect} from "react"
import {Bar} from 'react-chartjs-2'

const arrow_up = require("../../icons/up_arrow.svg")

const server_predict= 'http://127.0.0.1:5000/predict' // Edit this in production version to get prediction from the trained model

const PredictionMitigation = () => {
    const [method1Active, setMethod1Active] = useState(true)
    const [initPred, setInitPred] = useState(null)
    const [theta, setTheta] = useState(null)

    function handle_method_state(src, new_state) {
        if (src === 1) {
            setMethod1Active(new_state)
        }
    }

    function handle_set_theta(){
        var res_theta = parseFloat(theta)
        console.log(res_theta)
        if (res_theta) {
            if (res_theta < 0.5 || res_theta > 1) {
                alert("Please insert a value between 0.5 and 1")
            }
            else {
                var deferred_pred = initPred.map((entry) => {
                    if (entry.pred_label === 1 && Math.max(entry.pred_prob[1], 1-entry.pred_prob[1]) < theta) {
                        entry.pred_label = 2
                        console.log(entry)
                        return entry
                    }
                    else {
                        return entry
                    }
                })
                setInitPred(deferred_pred)
            }
        } else {
            console.log("GO")
            alert("Please insert a float number")
        }
    }

    useEffect(() => {
        test_prediction()
    }, [])

    function test_prediction() {
        console.log("Sending to server")
        const data = JSON.parse(window.localStorage.getItem("current_dataset")).result
        console.log(data)
        const data_json = {
            "data": data,
            "label": ['Hateful', 'Offensive', 'Neither']
        }   

        const otherParam = {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data_json),
            method: "POST",
        }
        fetch(server_predict, otherParam).then(
            data => {
                return data.json()}
        ).then(res => {
            console.log(res)
            //Combine the result into a complete picture
            var combined_res = res.data.map((entry, idx) => {
                var new_entry = entry
                new_entry['pred_label'] = res.pred_result[idx]
                new_entry['pred_prob'] = res.pred_prob[idx]
                return new_entry
            })
            console.log(combined_res)
            setInitPred(combined_res)
        })
    }

    //Process the initial prediction into graph
    function process_init_pred() {
        if (initPred !== null) {
            //Separate tweet based on the label
            var aae_tweets = []
            var sae_tweets = []
            initPred.forEach((entry) => {
                if (entry.aae_label === "AAE") {
                    aae_tweets.push(entry)
                } else {
                    sae_tweets.push(entry)
                }
            })
            console.log("AAE: "+aae_tweets.length+" SAE: "+sae_tweets.length)

            const labels = ["Hateful", "Offensive", "Neither"]
            var aae_ratio = [0, 0, 0]
            aae_tweets.forEach((tweet) => {
                aae_ratio[tweet.pred_label] = aae_ratio[tweet.pred_label] + 1
            })

            var sae_ratio = [0, 0, 0]
            sae_tweets.forEach((tweet) => {
                sae_ratio[tweet.pred_label] = sae_ratio[tweet.pred_label] + 1
            })

            console.log(aae_ratio)
            // Display the amount of each label into graph
            const graph_data = {
                labels: labels,
                datasets: [{
                    label: 'AAE tweets',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: aae_ratio
                },{
                    label: 'SAE tweets',
                    backgroundColor: 'rgba(52, 152, 219,0.2)',
                    borderColor: 'rgba(52, 152, 219,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(52, 152, 219,0.4)',
                    hoverBorderColor: 'rgba(52, 152, 219,1)',
                    data: sae_ratio
                }]
            }

            return (
                <div>
                    <Bar
                    data={graph_data}
                    height={100}
                    options={{
                        // maintainAspectRatio: false,
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                },
                                ticks: {min:0}
                            }]
                        }
                    }}
                    />
                </div>
            )
        }
    }

    return (
        <div className="page-box text-center">
            <h2 style={{marginBottom: "1rem"}}> Prediction Mitigation </h2>
            {process_init_pred()}
            <div style={{textAlign: "left"}}>
                <h3 style={{margin: "1rem 0rem"}}> Mitigation Method </h3>
                <h4 style={{margin: "1rem 0rem"}}> Action 1: Reject Option-based Classification </h4>
                <p> Let's say we trained a model, and use it to predict the abusive label of a tweet  𝑡 . Then the model produces a probability for each label  𝑙𝑖 , meaning the probability of being assigned to the label  𝑙𝑖  for the tweet  𝑡 . Normally, we find the maximum probability across the labels and assign the label as a prediction result.

                The insight of this bias mitigation technique is that even if we assign the label with the highest probability, it can be still uncertain. For example, let's say we have two labels  𝑙1  and  𝑙2 , and our model produces probabilities  𝑝1=0.55 and  𝑝2=0.45 for a tweet  𝑡 . Even if we can assign the label  𝑙1  in this case, we can say the model is not really sure about the assignment because the probability (i.e.  𝑝1 ) is relatively low. </p>

                <p>The technique introduces  𝜃 , a threshold to defer the label assignment. If  𝑚𝑎𝑥(𝑃(𝑡=𝑐𝑖),1−𝑃(𝑡=𝑐𝑖)) &lt; 𝜃  'where  0.5&lt;𝜃&lt;1 , we defer the assignment at the moment, meaning we do not always assign the label with the highest probability. We refer to such region as critical region.For all the deferred assignment, we assign a label in a way that it mitigates the bias. </p>
                
                <p>For example, in our case, if the model is not sure (i.e. the condition for deffering the decision has been satisfied) for an AAE tweet, we do not assign "Offensive" even the probability of being "Offensive" is the highest. In the case where "Offensive" is the highest, we simply assign the label with second highest probability. For the deffered assignment for a SAE tweet, we assign "Offensive" regardless of the probabilities. By having different assignment methods for different groups, we can reduce the bias.'</p>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> Set the value of 𝜃: <input style={{border: "2px solid black", borderRadius: "5px", width: "75px", marginLeft: "0.5rem"}} onChange={(e) => setTheta(e.target.value)}/><button class='btn btn-green' style={{marginLeft: "2rem"}} onClick={() => handle_set_theta()}> UPDATE RESULT</button>
            </div>
        </div>
    )

    // return (
    //     <div className="page-box text-center">
    //         <h2 style={{marginBottom: "1rem"}}> Prediction Mitigation </h2>
    //         <button className="btn btn-green" style={{position: "absolute", right: "5rem"}}> Go to Code </button>
    //         <div style={{textAlign: "left"}}>
    //             <h3 style={{marginBottom: "1rem"}}> Mitigation Methods </h3>
    //             <div className="method-header" onClick={() => handle_method_state(1, !method1Active)}>
    //                 <span> Method 1: Reject Option Classifier </span>
    //                 <img src={arrow_up} style={{cursor: "pointer"}} className={method1Active? '': 'rotate'}></img>
    //             </div>
    //             <div style={{margin: "0rem 3rem"}} className={method1Active? '' : 'd-none'}>
    //                 <p> Explanation: Lorem ipsum dolor sit amet, falli accusata invenire ex pri. Alia meliore ut vim, ne quot menandri democritum sea, cu noster possim epicurei mea. Vix ne exerci detraxit neglegentur, an iisque tamquam est. Cum in mazim similique comprehensam, qualisque urbanitas est id. Ne erroribus forensibus dissentiet eos, mei dicunt tritani accusam an. </p>

    //                 <p> His ei nobis singulis. Duis salutandi concludaturque his an, eum at omnis soleat accusamus. Ea vel veniam definitiones. Eu eum nisl prodesset, an cibo expetenda has, ex eum dicam suavitate. Qui ex graece alienum torquatos. Errem numquam qui no, ex duis philosophia vel.</p>

    //                 <p> Sample Code: </p>
    //                 <pre style={{margin: "0 2rem", backgroundColor: "#E0DEDE", padding: "1rem"}}>
    //                     <code>
    //                         a = 9 <br/>
    //                         b = 10 <br/>
    //                         print(a + b)
    //                     </code>
    //                 </pre>
    //             </div>
    //             <div className="method-header">
    //                 Method 2: _______
    //             </div>
    //             <div className="method-header">
    //                 Method 3: _______
    //             </div>
    //         </div>
            
    //         <button className='btn btn-green' style={{margin: "1.5rem auto"}}> SAVE </button>
    //     </div>
    // )
}

export default PredictionMitigation;