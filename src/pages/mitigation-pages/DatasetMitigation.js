import React, {useState, useEffect} from "react"
import Dropdown from "react-bootstrap/Dropdown"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import {Bar} from 'react-chartjs-2'
import {useHistory} from 'react-router-dom'

const plus = require('../../icons/plus.svg')
const minus = require('../../icons/minus.svg')

const DatasetMitigation = () => {
    const savedDataset = JSON.parse(window.localStorage.getItem("aae_dataset"))
    const [chosenGraph, setChosenGraph] = useState("Label")
    const [labelRatio, setLabelRatio] = useState(1)
    const [chosenLabel, setChosenLabel] = useState("None")   
    const [classRatio, setClassRatio] = useState(1)
    const [chosenClass, setChosenClass] = useState("None")
    const [currentData, setCurrentData] = useState(null)
    const [update, setUpdate] = useState(true) //Just to prevent infinite re-render
    const [labelName, setLabelName] = useState([]) //Label name which may be different between datasets
    const [className, setClassName] = useState(["SAE", "AAE"])
    const [displayLoading, setDisplayLoading] = useState(false) // Display loading to indicate predicting process
    const history = useHistory()
    const server_aae_classify = 'http://127.0.0.1:5000/aae-classify' // Edit this in production version to classify the tweet based on aae classification

    // TODO: Make this pass-able instead of hard-coded
    const idx_name_label = {
        0: "Hateful", 
        1: "Offensive", 
        2: "Neither"
    }

    // This is to obtained SAE/AAE classification through server
    // If possible, use a pre-existing dataset that already has this classification
    // because it takes quite long
    // If use the pre-existing dataset, set this to processing the dataset and store into the variable
    useEffect(() => {
        window.scrollTo(0, 0)
        console.log(savedDataset)
        if (savedDataset !== null) {
            setCurrentData(savedDataset.result)
        } else {
            setDisplayLoading(true)
            const data_json = {
                query: JSON.parse(window.sessionStorage.getItem("current_dataset"))
            }
    
            const otherParam = {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_json),
                method: "POST",
            }
            fetch(server_aae_classify, otherParam).then(
                data => {return data.json()}
            ).then(res => {
                setDisplayLoading(false)
                console.log(res)
                window.localStorage.setItem("aae_dataset", JSON.stringify(res))
                setCurrentData(res.result)
            })
        }
    }, [])

    // Testing purpose only; Delete when not needed
    useEffect(() => {
        setUpdate(true)
        process_dataset()
        handle_ratio_change()
    }, [labelRatio, chosenLabel, classRatio, chosenClass])

    // Get random value from array. Courtesy of https://stackoverflow.com/a/19270021
    function getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    // Handle calculation of the ratio
    function handle_calc(src, op) {
        if (src === "label") {
            if (classRatio !== 1) {
                alert("Only one property can be undersampled at a time")
            }
            if (op === "plus") {
                if (labelRatio >= 1) { alert("The ratio cannot be larger than 1.0") }
                else { setLabelRatio(labelRatio + 0.1)} }
            else {
                if (labelRatio >= 0 && labelRatio < 0.1) { alert("The ratio cannot be smaller than 0") }
                else { setLabelRatio(labelRatio - 0.1)} }

        }
        else {
            if (labelRatio !== 1) {
                alert("Only one property can be undersampled at a time")
                return
            }
            if (op === "plus") {
                if (classRatio >= 1) { alert("The ratio cannot be larger than 1.0") }
                else { setClassRatio(classRatio + 0.1)} }
            else {
                if (classRatio >= 0 && classRatio < 0.1) { alert("The ratio cannot be smaller than 0") }
                else { setClassRatio(classRatio - 0.1)} }
        }
    }

    // Handle the graph change
    // function handle_graph()

    // Handle the selection of class or label
    function handle_selection(src, choice) {
        if (src === "label") {
            setChosenLabel(choice)
        }
        else {
            setChosenClass(choice)
        }
    }

    // Handle changing in the ratio input
    function handle_ratio_change() {
        if (labelRatio != 1) {
            if (chosenLabel === "None") {
                alert("Please select a label to update it")
                setLabelRatio(1)
            } else {
                // Update the dataset based on the ratio
                var label_twt = {}
                labelName.forEach((label) => {label_twt[label] = []})
                
                // Calculate the amount of label in question
                var twt_cnt = 0
                savedDataset.forEach((entry) => {
                    // Get numerical value of chosen_label
                    const num_val = Object.keys(idx_name_label).find(key => idx_name_label[key] === chosenLabel);
                    
                    //Search entry with such label
                    if (entry.label == num_val) {twt_cnt++}
                    label_twt[idx_name_label[entry.label]].push(entry) 
                })
                const new_amnt = Math.floor(twt_cnt*labelRatio)
                console.log(label_twt)
                label_twt[chosenLabel] = getRandom(label_twt[chosenLabel], new_amnt)
                console.log(label_twt)
                var result_data = []
                for (const label in label_twt) {
                    result_data = result_data.concat(label_twt[label])
                }
                // console.log(result_data)
                setCurrentData(result_data)
            }
        }
        if (classRatio != 1) {
            if (chosenClass === "None") {
                alert("Please select a class to update it")
                setClassRatio(1)
            } else {
                // Update the dataset based on the ratio
                var class_twt = {}
                className.forEach((class_name) => {class_twt[class_name] = []})
                // Calculate the amount of label in question
                var twt_cnt = 0
                console.log(chosenClass)
                savedDataset.forEach((entry) => {
                    //Search entry with such label
                    if (entry.aae_label == chosenClass) {twt_cnt++}
                    class_twt[entry.aae_label].push(entry) 
                })
                const new_amnt = Math.floor(twt_cnt*classRatio)
                console.log(class_twt)
                class_twt[chosenClass] = getRandom(class_twt[chosenClass], new_amnt)
                console.log(class_twt)
                var result_data = []
                for (const classes in class_twt) {
                    result_data = result_data.concat(class_twt[classes])
                }
                // console.log(result_data)
                setCurrentData(result_data)
            }
        }
    }

    //This function process the dataset into a graph
    function process_dataset() {
        if (currentData != null && chosenGraph === "Label") {
            //Get the labels
            // console.log(currentData)
            var complete_labels = currentData.map((entry) => {return entry.label})
            var labels = complete_labels.filter((v, i, a) => a.indexOf(v) === i)

            //Get the amount of tweet from each label
            var ratio = {}
            labels.forEach((label) => {ratio[label] = 0})
            complete_labels.forEach((label) => {
                ratio[label] = ratio[label] + 1
            })

            //If we want to modify the label name, here is the correct place
            var correct_label = ["Hateful", "Offensive", "Neither"]
            var new_labels = labels.map((label_idx) => correct_label[parseInt(label_idx)])
            for (var i = 0; i < new_labels.length; i++) {
                ratio[new_labels[i]] = ratio[labels[i]]
                delete ratio[labels[i]]
            }
            //--------------------------------------------------------------
            if (labelName != new_labels && update) {
                // setLabelName(new_labels)
                setLabelName(Object.values(idx_name_label))
                setUpdate(false)
            }

            //Display the amount of each label into graph
            const graph_data = {
                labels: new_labels,
                datasets: [{
                    label: 'Label distribution',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: Object.values(ratio)
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
        else if (currentData != null && chosenGraph === "Class") {
            //Get the classes
            var complete_class = currentData.map((entry) => {return entry.aae_label})
            var classes = complete_class.filter((v, i, a) => a.indexOf(v) === i)
            // console.log(classes)
            //Get the amount of tweet from each lclass
            var ratio = {}
            classes.forEach((class_name) => {ratio[class_name] = 0})
            complete_class.forEach((class_name) => {
                ratio[class_name] = ratio[class_name] + 1
            })
            // console.log(ratio)

            //Display the amount of each label into graph
            const graph_data = {
                labels: className,
                datasets: [{
                    label: 'Class distribution',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: Object.values(ratio)
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

    function save_dataset() {
        window.sessionStorage.setItem("current_dataset", JSON.stringify(currentData))
        history.push('/bias-mitigation')
    }

    function display_loading() {
        return (<div style={{marginBottom: "5rem", marginTop: "2rem"}}>
            <h3> Loading the dialect prediction.... </h3>
            <h5> (It may takes 10-15 minutes for the first time loading) </h5>
        </div>)
    }
    
     return(
        <div className="page-box dataset-mitigation text-center">
            <h2 style={{marginBottom: "1rem"}}> Dataset Mitigation </h2>
            <Dropdown as={ButtonGroup} style={{marginBottom: "1.5rem"}}>
                <Dropdown.Toggle id="green-1" style={{backgroundColor: "#2A6350", borderColor: "#2A6350"}}> {chosenGraph} </Dropdown.Toggle>
                <Dropdown.Menu>
                {['Label', 'Class'].map((item, i) => {
                    return (<Dropdown.Item key={i} onClick={() => setChosenGraph(item)}> {item} </Dropdown.Item>)
                })}
                </Dropdown.Menu>
            </Dropdown>
            {displayLoading ? display_loading() : process_dataset()}
            <div style={{textAlign: "left"}}>
                <h3 style={{margin: "1rem 0rem"}}> Mitigation Method </h3>
                <h4 style={{margin: "1rem 0rem"}}> Action 1: Undersampling </h4>
                <p> Undersampling is a preprocessing method that is imposed to the dataset in order to balance the proportion of the labels in the dataset. </p>
                <div className='label-undersampling'>
                    <div style={{display: "flex", alignItems: "center"}} className="undersampling">
                        {/* Label refers to the abusive label. The given sample is for dataset 1 */}
                        <p className="input-label"> Choose a label: </p>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {chosenLabel}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {labelName.map((label) => {
                                    return (<Dropdown.Item onClick={() => handle_selection("label", label)}> {label} </Dropdown.Item>)
                                })}
                            </Dropdown.Menu>
                        </Dropdown>

                        <p className="input-label"> Sampling Ratio: </p>

                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", border: "2px solid black", borderRadius: "5px", minWidth: "150px", padding: "2px"}}> 
                            <div className="num-input" onClick={() => handle_calc("label", "minus")}>
                                <img src={minus} alt=''/> 
                            </div>
                            <h5 style={{marginBottom: "0px"}}> {labelRatio.toFixed(2)} </h5>
                            <div className="num-input" onClick={() => handle_calc("label", "plus")}> 
                                <img src={plus} alt=''/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='class-undersampling' style={{marginTop: "1rem"}}>
                    <div style={{display: "flex", alignItems: "center"}} className="undersampling">
                        <p className="input-label"> Choose a class: </p>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {chosenClass}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handle_selection("class", "AAE")}> AAE </Dropdown.Item>
                                <Dropdown.Item onClick={() => handle_selection("class", "SAE")}> SAE </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <p className="input-label"> Sampling Ratio: </p>

                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", border: "2px solid black", borderRadius: "5px", minWidth: "150px", padding: "2px"}}> 
                            <div className="num-input" onClick={() => handle_calc("class", "minus")}>
                                <img src={minus} alt=''/> 
                            </div>
                            <h5 style={{marginBottom: "0px"}}> {classRatio.toFixed(2)} </h5>
                            <div className="num-input" onClick={() => handle_calc("class", "plus")}> 
                                <img src={plus} alt=''/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <button class='btn btn-green' style={{margin: "3rem auto"}} onClick={() => save_dataset()}> SAVE </button>
        </div>
    )
}

export default DatasetMitigation;