import React, { useState, useEffect, useCallback } from "react"
import "../style/Visualization.css"
import { useDispatch, useSelector } from "react-redux"
import ScatterChart from "../components/ScatterChart"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import VisualDataset from "../components/VisualDataset"
import Result from "../components/Result"
import DataTable from "../components/DataTable"
import {Bar} from "react-chartjs-2"
import Papa from 'papaparse'

const BiasTesting = (props) => {
    const datasetURL = [
        'http://3.34.183.118:3000/bias-awareness-platform/testTweet_withPrediction_david.csv',
        'http://3.34.183.118:3000/bias-awareness-platform/testTweet_withPrediction_hatespeech.csv',
    ]

    const datasetIndex = useSelector(state => state.data);
    const [graphIndex, setGraphIndex] = useState(0)

    const categories = [
        [
            ["0", "1"],
            ["0", "1", "2"],
        ],
        [
            ["0", "1"],
            ["0", "1"]
        ]
    ];

    const graphNames = [
        [ // david
            {
                'category': 'General statistics',
                'graphs': [
                    {
                        'label': "Dialect distribution",
                        'graphIndex': 0
                    },
                    {
                        'label': "Prediced label distribution",
                        'graphIndex': 1
                    },
                    {
                        'label': "Predicted label distribution for AAE",
                        'graphIndex': 2
                    },
                    {
                        'label': "Predicted label distribution for SAE",
                        'graphIndex': 3
                    },
                ]
            },
        ],
        [ // hate speech
            {
                'category': 'General statistics',
                'graphs': [
                    {
                        'label': "Dialect distribution",
                        'graphIndex': 0
                    },
                    {
                        'label': "Prediced label distribution",
                        'graphIndex': 1
                    },
                    {
                        'label': "Predicted label distribution for AAE",
                        'graphIndex': 2
                    },
                    {
                        'label': "Predicted label distribution for SAE",
                        'graphIndex': 3
                    },
                ]
            },
        ]
    ]

    const resultStatValues = [[{
        class: "Hateful",
        pblack: 0.075,
        pwhite: 0.008,
        pblack_white: 9.38,
    }, {
        class: "Offensive",
        pblack: 0.217,
        pwhite: 0.030,
        pblack_white: 7.23
    },  
   ],

    [{
        class: "Hateful",
        pblack: 0.296,
        pwhite: 0.060,
        pblack_white: 4.933
    }, ]

    ]

    const accStatValues = [[{
        class: "Hateful",
        precision: 0.45,
        recall: 0.59,
        f1_score: 0.51,
    }, {
        class: "Abusive",
        precision: 0.96,
        recall: 0.91,
        f1_score: 0.94,
    },
    {
        class: "Neither",
        precision: 0.83,
        recall: 0.94,
        f1_score: 0.88,
    }],
    [
        {
            class: "Normal",
            precision: 0.84,
            recall: 0.75,
            f1_score: 0.79,
        },
        {
            class: "Hateful",
            precision: 0.84,
            recall: 0.75,
            f1_score: 0.79,

        }
    ]]

    const graphData = [
        [ // david
            [
                {
                    'code': 'david',
                    'condition': 'total_dialect',
                    'label': ['AAE', 'SAE'],
                    'data': [1000, 1000]
                }
            ],
            [
                {
                    'code': 'david',
                    'condition': 'total_label',
                    'label': ['Hateful', 'Abusive', 'Neither'],
                    'data': [83, 247, 1670]
                },
            ],
            [
                {
                    'code': 'david',
                    'condition': 'AAE_label',
                    'label': ['Hateful', 'Abusive', 'Neither'],
                    'data': [75, 217, 708]
                },
            ],
            [
                {
                    'code': 'david',
                    'condition': 'SAE_label',
                    'label': ['Hateful', 'Abusive', 'Neither'],
                    'data': [8, 30, 962]
                }
            ],
        ],
        [ // hatespeech
            [
                {
                    'code': 'hatespeech',
                    'condition': 'total_dialect',
                    'label': ['AAE', 'SAE'],
                    'data': [1000, 1000]
                }
            ],
            [
                {
                    'code': 'hatespeech',
                    'condition': 'total_label',
                    'label': ['Normal', 'Hateful'],
                    'data': [1651, 349]
                },
            ],
            [
                {
                    'code': 'david',
                    'condition': 'AAE_label',
                    'label': ['Normal', 'Hateful'],
                    'data': [708, 292]
                },
            ],
            [
                {
                    'code': 'david',
                    'condition': 'SAE_label',
                    'label': ['Normal', 'Hateful'],
                    'data': [943, 57]
                }
            ],
        ]
    ]

    const [currentDatasetIndex, setCurrentDatasetIndex] = useState("0")
    const [categoryList, setCategoryList] = useState(categories[0])
    const [category, setCategory] = useState(categoryList[0])
    const [exploreActive, setExploreActive] = useState("data")
    const [resultAvailable, setResultAvailable] = useState(true)
    const [resultStat, setResultStat] = useState([{}])
    const [accStat, setAccStat] = useState([{}])

    const loaderActive = useSelector(state => state.loaderActive)
    const [tweetListSample, setTweetListSample] = useState([{}])
    const [tweetListReadFinished, setTweetListReadFinished] = useState(false)
    const dispatch = useDispatch()

    const [tweetDB, setTweetDB] = useState([[]]);

    // useEffect(() => {
    //     fetchData(0);
    //     setAccStat(accStatValues[0]);
    // }, [tweetListReadFinished])

    //For the dataset name
    const datasetUsed = useSelector(state => state.data)
    //Change the dataset name here freely
    const datasetList = ["Dataset 1", "Dataset 2"]
    
    function processCSV(datasetIndex, chunks, receivedLength, temp) {
        // Step 4: concatenate chunks into single Uint8Array
        let chunksAll = new Uint8Array(receivedLength); // (4.1)
        let position = 0;
        for (let chunk of chunks) {
            chunksAll.set(chunk, position); // (4.2)
            position += chunk.length;
        }

        // Step 5: decode into a string
        let merged = new TextDecoder("utf-8").decode(chunksAll);

        const csv = merged // the csv text
        //The commented area is for umar's local development
        // const csv = require("../testTweet_withPrediction_david.csv")
        
        const results = Papa.parse(csv, {
            header: true,
            // download: true,
            complete: function (results) {
                var tweetData = [];

                for (var i = 0; i < results.data.length; i++) {
                    // if (typeof results.data[i].tweet === "undefined") {
                    //     continue;
                    // }
                    tweetData.push({
                        tweet: results.data[i].tweet.trim(),
                        label: results.data[i].class,
                        predLabel: results.data[i].predLabel
                    });
                }

                temp[datasetIndex] = tweetData;

                setTweetListSample(tweetData);
                setTweetDB(temp);
            }
        }) // object with { data, errors, meta }
    }

    async function fetchData(datasetIndex) {
        var temp = tweetDB;

        if(temp == null) temp = [];

        while (true) {
            if (temp.length > datasetIndex) break;

            temp.push([]);
        }

        if(temp[datasetIndex].length > 0){
            setTweetListSample(tweetDB[datasetIndex]);
            return;
        } 

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
                    
                    processCSV(datasetIndex, chunks, receivedLength, temp);

                    return;
                  }
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
        fetchData(datasetIndex);
        setResultStat(resultStatValues[datasetIndex]);
    }, [datasetIndex])

    function changeCategory(index) {
        return () => {
            setCategory(categoryList[index])
        }
    }

    const barOption = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                    color: "#131c2b"
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Label',
                },
            }],
            yAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                    color: "#131c2b"
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Distribution',
                },
                ticks: {
                    suggestedMin: 0,
                    maxTicksLimit: 10,
                    suggestedMax: 1
                }  
            }]
        },
    }

    const barData = {
        labels: graphIndex < graphData[datasetIndex].length ? graphData[datasetIndex][graphIndex][0].label : [] ,
        datasets: [
            {
            label: graphIndex < graphNames[datasetIndex][0].graphs.length ? graphNames[datasetIndex][0].graphs[graphIndex].label : '',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: graphIndex < graphData[datasetIndex].length ? graphData[datasetIndex][graphIndex][0].data : [] ,
            }
        ]
    }

    function createBarChart() {
        switch(true) {
            default:
                return(
                    <div style={{margin: "1rem"}}>
                        <Bar data={barData} options={barOption} />
                        <div className='d-flex justify-content-center' style={{marginTop: "1rem"}}>
                            <h5 style={{marginRight: "1rem", marginTop: "1rem"}}> List of view :</h5>
                            {
                            graphNames[datasetIndex].map((item, i) => (
                                <Card>
                                    <Card.Header>
                                            {item.category}
                                    </Card.Header>
                                        <ListGroup>
                                            {item.graphs.map((item2, j) => (
                                                <ListGroup.Item action active={graphIndex === item2.graphIndex} onClick={() => setGraphIndex(item2.graphIndex)}>{item2.label}</ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                </Card>
                            ))}
                        </div>
                    </div>
                )
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
            return (<DataTable categoryList={categoryList[0]} categoryList2={categoryList[1]} tweetListSample={tweetListSample} datasetIndex={datasetIndex} testFlag={true}/>)
        }
    }

    function handleDatasetChange(datasetIndex) {
        if(currentDatasetIndex != datasetIndex) {
            fetchData(parseInt(datasetIndex));
            setCategoryList(categories[parseInt(datasetIndex)]);
            setCategory(categories[parseInt(datasetIndex)][0]);
            setCurrentDatasetIndex(datasetIndex);

            setAccStat(accStatValues[parseInt(datasetIndex)]);
        }
    }

    return(
        <div className='visualization-new'>
            <div className={'loader '+loaderActive}>
                <h3> Please wait a moment </h3>
                <p style={{marginTop: "1rem"}}> Your model is current being built.</p>
                <div className='spinner'></div>
            </div>
            <div className='visualization-new-container'>
                <div className='graph-left'>
                    {selectExplore()}
                    
                </div>
                <div className='interactive-right'>
                    <div id='interactive-controller'>
                        <div className='d-flex interact-tab'> 
                            <div style={{padding: "1rem"}}>
                                <h5> Choose a dataset: </h5>
                            </div>
                            <VisualDataset onChange={handleDatasetChange}/>
                        </div>
                    </div>
                    <div id='visual-result'>
                        <h3> Result </h3>
                        {/*
                        <BiasResult biasStat={accStat}/>*/ }
                        <Result resultStat={resultStat} accStat={accStat} resultAvailable={resultAvailable} datasetIndex={datasetIndex} activeResult='distr'/>
                        {createBarChart()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BiasTesting