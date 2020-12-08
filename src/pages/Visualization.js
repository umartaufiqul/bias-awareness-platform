import React, { useState, useEffect, useCallback } from "react"
import "../style/Visualization.css"
import { useDispatch, useSelector } from "react-redux"
import ScatterChart from "../components/ScatterChart"
import VisualDataset from "../components/VisualDataset"
import VisualModelNew from "../components/VisualModelNew"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import { activateLoader, deactivateLoader, updateResult } from "../actions"
import Result from "../components/Result"
import DataTable from "../components/DataTable"
import Papa from 'papaparse'

const Visualization = (props) => {
    const datasetURL = [
        'http://3.35.21.90:3000/bias-awareness-platform/david_formatted.csv',
        'http://3.35.21.90:3000/bias-awareness-platform/hatespeech_formatted.csv'
    ];

    const categories = [
        ["0", "1", "2"],
        ["0", "1"]
    ];

    const accStatValues = [
        {
            stat: [{
                    class: "Hateful",
                    precision: 0.45,
                    recall: 0.59,
                    "f1_score": 0.51,
                    support: 164
                }, {
                    class: "Abusive",
                    precision: 0.95,
                    recall: 0.91,
                    "f1_score": 0.94,
                    support: 1905
                }, {
                    class: "Neither",
                    precision: 0.83,
                    recall: 0.94,
                    "f1_score": 0.88,
                    support: 410
                }],
            accuracy: 0.89,
            support: 2479,
            macro: {
                precision: 0.75,
                recall: 0.81,
                "f1-score": 0.78,
            },
            weighted: {
                precision: 0.91,
                recall: 0.89,
                "f1-score": 0.9,
            },
            labels: ['Hateful', 'Abusive', 'Neither'],
            matrix: [
                [0.59, 0.33, 0.09],
                [0.06, 0.91, 0.03],
                [0.03, 0.03, 0.94]
            ]
        },
        {
            stat: [
                {
                    class: "Normal",
                    precision: 0.84,
                    recall: 0.75,
                    f1_score: 0.79,
                    support: 1013,
                },
                {
                    class: "Hateful",
                    precision: 0.84,
                    recall: 0.75,
                    f1_score: 0.79,
                    support: 987
                }
            ],
            accuracy: 0.72,
            support: 2000,
            macro: {
                precision: 0.75,
                recall: 0.81,
                "f1-score": 0.78,
                support: 2000
            },
            weighted: {
                precision: 0.91,
                recall: 0.89,
                "f1-score": 0.9,
                support: 2000
            },
            labels: ['Normal', 'Hateful'],
            matrix: [
                [0.96, 0.04],
                [0.11, 0.89]
            ]
        }
        ]

    const [datasetActive, setDatasetActive] = useState("active")
    const [modelActive, setModelActive] = useState("")
    const [wordInput, setWordInput] = useState("")
    const [wordList, setWordList] = useState([])
    const [categoryList, setCategoryList] = useState(categories[0])
    const [category, setCategory] = useState(categoryList[0])
    const [exploreActive, setExploreActive] = useState("data")
    const [resultAvailable, setResultAvailable] = useState(true)
    const [dataAvailable, setDataAvailable] = useState(false) //Whether the custom data has been uploaded & processed correctly
    const [customData, setCustomData] = useState("")
    const [resultStat, setResultStat] = useState([{}])
    const [accStat, setAccStat] = useState([{}])

    const resultData = useSelector(state => state.data)
    const updateRes = useSelector(state => state.updateResult)
    const [currentDatasetIndex, setCurrentDatasetIndex] = useState(resultData)

    const loaderActive = useSelector(state => state.loaderActive)
    const resultModel = useSelector(state => state.model)
    const [tweetListSample, setTweetListSample] = useState([{}])
    const [tweetListReadFinished, setTweetListReadFinished] = useState(false)
    const dispatch = useDispatch()

    //Check if the chosen data is custom or not
    useEffect(() => {
        console.log(resultData)
        if (resultData < 0) {
            setDataAvailable(false)
        }
        else {
            setDataAvailable(true)
        }
    }, [resultData])
    
    function processCSV(chunks, receivedLength) {
        console.log(chunks);
        console.log(receivedLength);

        // Step 4: concatenate chunks into single Uint8Array
        let chunksAll = new Uint8Array(receivedLength); // (4.1)
        let position = 0;
        for (let chunk of chunks) {
            chunksAll.set(chunk, position); // (4.2)
            position += chunk.length;
        }

        // Step 5: decode into a string
        let merged = new TextDecoder("utf-8").decode(chunksAll);

        console.log(merged);

        const csv = merged // the csv text
        //The commented area is for umar's local development
        // const csv = require("../david_formatted.csv")

        console.log(csv);

        const results = Papa.parse(csv, {
            header: true,
            // download: true,
            complete: function (results) {
                var tweetData = [];

                console.log(results);
                for (var i = 0; i < results.data.length; i++) {
                    // if (typeof results.data[i].tweet === "undefined") {
                    //     continue;
                    // }
                    tweetData.push({
                        tweet: results.data[i].tweet,
                        label: results.data[i].class
                    });
                }

                console.log(tweetData);

                setTweetListSample(tweetData);
                // setTweetListReadFinished(true);
            }
        }) // object with { data, errors, meta }
    }

    function processCSVLocal(datasetIndex) {
        const csvNames = [require("../david_formatted.csv"), require("../hatespeech_formatted.csv")]
        const csv = csvNames[datasetIndex]

        console.log(csv);

        const results = Papa.parse(csv, {
            header: true,
            download: true,
            complete: function (results) {
                var tweetData = [];
                for (var i = 0; i < results.data.length; i++) {
                    if (typeof results.data[i].tweet === "undefined") {
                        continue;
                    }
                    tweetData.push({
                        tweet: results.data[i].tweet,
                        label: results.data[i].class
                    });
                }

                // console.log(tweetData);

                setTweetListSample(tweetData);
                // setTweetListReadFinished(true);
            }
        }) // object with { data, errors, meta }
    }

    async function fetchData(datasetIndex) {
        const response = await fetch(datasetURL[datasetIndex])
        const reader = response.body.getReader()

        var chunks = [];
        var receivedLength = 0;

        const stream = new ReadableStream({
            start(controller) {
              // The following function handles each data chunk
              function push() {
                // "done" is a Boolean and value a "Uint8Array"
                reader.read().then(({ done, value }) => {
                  // Is there no more data to read?
                  if (done) {
                    // Tell the browser that we have finished sending data
                    controller.close();
                    
                    processCSV(chunks, receivedLength);

                    return;
                  }
                  console.log(value);
                  console.log(new TextDecoder("utf-8").decode(value))
                  console.log(value.length);

                  chunks.push(value);
                  receivedLength += value.length;
        
                  // Get the data and send it to the browser via the controller
                  controller.enqueue(value);
                  push();
                });
              };
              
              push();
            }
        });

    }

    useEffect(() => {
        // fetchData(0);
        //----Umar Local Development-----
        processCSVLocal(0)
        //-------------------------------
        setAccStat(accStatValues[0]);
        console.log(accStatValues[0])
    }, [tweetListReadFinished])

    useEffect(() => {
        console.log(accStat)
    }, [accStat])

    function handleDatasetChange(datasetIndex) {
        //Custom dataset
        if (datasetIndex < 0) {
            return
        }
        if(currentDatasetIndex != datasetIndex) {
            // fetchData(parseInt(datasetIndex));
            //-------Umar's Local Dev-----------
            processCSVLocal(datasetIndex)
            //----------------------------------
            setCategoryList(categories[parseInt(datasetIndex)]);
            setCategory(categories[parseInt(datasetIndex)][0]);
            setCurrentDatasetIndex(datasetIndex);

            setAccStat(accStatValues[parseInt(datasetIndex)]);
        }
    }

    function changeActiveState(id) {
        console.log(id)
        if (id === "dataset-tab" && datasetActive === "") {
           setDatasetActive("active");
           setModelActive("");
        } else if (id === "model-tab" && modelActive === ""){
            setDatasetActive("");
            setModelActive("active");
        }
    };

    //Open dataset if found with the name
    //NOTE: This only used for demonstration purpose
    useEffect(() => {
        if (customData === "") {
            console.log("No file has been submitted")
        }
        else {
            setTweetListSample(processDataToJSON())
            setDataAvailable(true)
        }
    }, [customData])

    function processDataToJSON() {
        var data_array = [...customData.data]
        var tweet_idx = customData.tweet
        var label_idx = customData.label
        data_array.shift()
        const json_tweet = data_array.map((entry, i) => {
            return {
                tweet: entry.data[tweet_idx],
                label: entry.data[label_idx]
            }
        })
        return json_tweet
    }

    // Store the current dataset in session storage to be used by the dataset mitigation
    useEffect(() => {
        window.sessionStorage.setItem('current_dataset', JSON.stringify(tweetListSample))
    }, [tweetListSample])

    function changeContent() {
        if (datasetActive === "active") {
            return <VisualDataset onChange={handleDatasetChange} passCustomData={setCustomData}/>
        }
        else {
            return <VisualModelNew />
        }
    };

    function handleExploreChange(tab) {
        setExploreActive(tab)
    }

    function handleInputChange(e) {
        setWordInput(e.target.value)
    };


    function handleInputDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault()
            const {value} = e.target
            setWordList([...wordList, value]);
            setWordInput("")
        }
    };

    function handleRemove(index) {
        return () => {
            setWordList(wordList.filter((item, i) => i !== index))
        }
    };

    function handleModelChange() {
        // dispatch(activateLoader())
        console.log("Update the result")
        dispatch(updateResult("UPDATE_RESULT"))
        sessionStorage.removeItem("updatedStat");
        dispatch(activateLoader())
    }

    function changeCategory(index) {
        return () => {
            setCategory(categoryList[index])
        }
    }

    function returnBadCategory() {
        //The only good category should be on the last
        var categories = [...categoryList]
        categories.pop()
        return (
            categories.map((item, i) => 
                <Dropdown.Item key={i} onClick={changeCategory(i)}>
                    {item}
                </Dropdown.Item>
            )
        )
    }

    //Return result if the custom data is already processed, and "no result" otherwise
    function returnResult() {
        console.log(dataAvailable)
        console.log(resultData)
        if (resultData < 0 && dataAvailable) {
            return(
            <div style={{margin: "3rem 2.5rem"}}>
                <p style={{color: "#d3d3d3"}}> The accuracy result for the custom model is yet to be calculated. Please click "Update result" button in order to do so</p>
            </div>
            )
        }
        else {
            return(<Result resultStat={resultStat} accStat={accStat} resultAvailable={resultAvailable} activeResult='report'/>)
        }
    }


    function selectExplore() {
        if (exploreActive === "result") {
            if (resultAvailable) {
                return (
                    <div className="explore-container" style={{marginTop: "1rem"}}>
                    <h1> Abusive Speech Detection Result </h1>
                    <div className='scatter-chart' style={{position: "relative", overflowY: "auto"}}>
                        <ScatterChart width={10} height={10} catName={category}/>
                        <form className='form-inline justify-content-center align-item-center' style={{marginTop: "1rem"}}>
                            <label style={{marginRight: "1rem"}}> <h6> Class: </h6></label>
                            <DropdownButton id="dropdown-basic-button" title={category}>
                                {returnBadCategory()}
                            </DropdownButton>
                        </form>
                    </div>
                </div>)
            }
            else {
                return(
                    <div style={{marginTop: "1rem", padding: "0rem 5rem"}}>
                        <h1> Abusive Speech Detection Result </h1>
                        <h3 style={{marginTop: "20%", color: "#676767"}}> No result to display </h3>
                        <p> There is no model that has been built yet. You can build a model using the model builder panel on the right side of the page. </p>
                    </div>
                )
            }
            
        }
        else {
            return (<DataTable categoryList={categoryList} tweetListSample={tweetListSample} datasetIndex={currentDatasetIndex} dataAvailable={dataAvailable} customData={customData} wordList={wordList}/>)
        }
    }

    // Detect the update result button push
    useEffect(() => {
        if (updateRes && dataAvailable && resultData < 0) {
            console.log("Updating the result...")
            // console.log(tweetListSample)
            // Send the file to the server
            // Include the label for result evaluation

            const classificationLabels = [
                ['Hateful', 'Offensive', 'Neither'],
                ['Normal', 'Hateful'],
                ['Positive', 'Negative'],
            ]

            const data_json = {
                "data": tweetListSample,
                "label": classificationLabels[0]
            }

            const otherParam = {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_json),
                method: "POST",
            }
            fetch('http://127.0.0.1:5000/data', otherParam).then(
                data => {return data.json()}
            ).then(res => {
                console.log(res)
                //Convert the report to the acceptable format in result.js
                var stat = []
                for (var key in Object.keys(res.report)) {
                    //For class prediction, convert the number into string
                    if (/^\d+$/.test(key) && typeof res.report[key] !== 'undefined') {
                        //Statistic for a class
                        var curr_stat = {
                            //Note: The class is very hardcoded and not flexible when the dataset is custom
                            class: classificationLabels[0][parseInt(key)],
                            precision: res.report[key]["precision"].toFixed(2),
                            recall: res.report[key]["recall"].toFixed(2),
                            f1_score: res.report[key]["f1-score"].toFixed(2),
                            support:  res.report[key]["support"]
                        }
                        console.log(curr_stat)
                        stat.push(curr_stat)
                    }
                }
                var final_stat = {
                    stat,
                    accuracy: res.report['accuracy'].toFixed(2),
                    macro: res.report['macro avg'],
                    weighted: res.report['weighted avg'],
                }
                console.log(final_stat)
                sessionStorage.setItem("updatedStat", JSON.stringify(final_stat));
                dispatch(updateResult("UPDATE_FINISH"))
                dispatch(deactivateLoader())
                // setUpdatedData(null)
                dispatch(updateResult("UPDATE_RESULT")) // The variable is set again to true in order to trigger the result change in the Result.js
            })
            .catch(err => console.log(err))
            // setUpdate(true)
        }
    }, [updateRes, dataAvailable])

    return(
        <div className='visualization-new'>
            <div className={'loader '+loaderActive}>
                <h3> Please wait a moment </h3>
                <p style={{marginTop: "1rem"}}> Your model is current being built.</p>
                <div className='spinner'></div>
            </div>
            <div className='visualization-new-container'>
                <div className='graph-left'>
                    {/* <div className='d-flex justify-content-center'>
                        <div className={exploreActive === "data" ? 'explore-choice active' : 'explore-choice'} onClick={() => handleExploreChange("data")}> Data </div>
                        <div className={exploreActive === "result" ? 'explore-choice active' : 'explore-choice'} onClick={() => handleExploreChange("result")}> Result </div>
                    </div> */}
                    {selectExplore()}
                    <div className='associated-words'>
                        <form className='form-inline'>
                        <label> Associated words: </label>
                        <input className="form-control ml-4" type="text" value={wordInput} onChange={handleInputChange} onKeyDown={handleInputDown}></input>
                        <OverlayTrigger
                            key={'top'}
                            placement={'top'}
                            overlay={
                                <Tooltip id={`tooltip-${'top'}`}>
                                Specify words that must be included in the dataset and exclude the rest of dataset. For example, inputting 'ugly' means the data processed are only tweets that contain 'ugly' in it.
                                </Tooltip>
                            }
                            >
                            <img src={require('../icons/help.svg')} alt='' id='help-tag'/>
                        </OverlayTrigger>
                        <button className='btn btn-green ml-4' onClick={(e) => {
                            e.preventDefault()
                            handleModelChange()
                            }}> Reload </button>
                        </form>
                        <ul className='word-container'>
                            {wordList.map((item, i) => 
                                <li key={i} className='word-tag'>
                                    <span> {item} </span>
                                    <img src={require('../icons/x-mark.svg')} alt='' onClick={handleRemove(i)}/>
                                </li>
                            )}
                        </ul>
                    </div>
                    
                </div>
                <div className='interactive-right'>
                    <div id='interactive-controller'>
                        <div className='d-flex interact-tab'> 
                            { <div className={'interactive-choice '+ datasetActive} id="dataset-tab" onClick={(e) => changeActiveState(e.currentTarget.id)}> DATASET </div> }
                            {
                            <div className={'interactive-choice '+modelActive} id="model-tab" onClick={(e) => changeActiveState(e.currentTarget.id)}> MODEL </div>
                            }

                        </div>
                        {/*
                        <div style={{padding: "1rem"}}>
                            <h5> Choose a dataset: </h5>
                        </div>
                        <VisualDataset onChange={handleDatasetChange}/>
                        */}
                        {<div className="interact-container">
                            {changeContent()}
                        </div> }
                        {
                                /*
                        <div className='load-btn'>
                            <button type='button' className="btn btn-green" onClick={(e) => {
                            e.preventDefault()
                            handleModelChange()
                            }}> Build Model </button>
                        </div>
                        */ }
                    </div>
                    <div id='visual-result'>
                        <h3> Result </h3>
                        {returnResult()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Visualization