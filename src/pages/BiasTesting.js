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
        'http://3.35.21.90:3000/bias-awareness-platform/testTweet_withPrediction_david.csv',
        'http://3.35.21.90:3000/bias-awareness-platform/testTweet_withPrediction_hatespeech.csv',
    ]

    const datasetIndex = useSelector(state => state.data);
    const [graphIndex, setGraphIndex] = useState(0)

    console.log(datasetIndex);

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
        pblack: 0.704,
        pwhite: 0.003,
        pblack_white: 0.005,
    }, {
        class: "Abusive",
        pblack: 0.083,
        pwhite: 0.048,
        pblack_white: 1.724
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
        precision: 0.95,
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
                    'data': [88, 248, 1664]
                },
            ],
            [
                {
                    'code': 'david',
                    'condition': 'AAE_label',
                    'label': ['Hateful', 'Abusive', 'Neither'],
                    'data': [78, 218, 704]
                },
            ],
            [
                {
                    'code': 'david',
                    'condition': 'SAE_label',
                    'label': ['Hateful', 'Abusive', 'Neither'],
                    'data': [10, 30, 960]
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
                    'data': [1644, 356]
                },
            ],
            [
                {
                    'code': 'david',
                    'condition': 'AAE_label',
                    'label': ['Normal', 'Hateful'],
                    'data': [704, 296]
                },
            ],
            [
                {
                    'code': 'david',
                    'condition': 'SAE_label',
                    'label': ['Normal', 'Hateful'],
                    'data': [940, 60]
                }
            ],
        ]
    ]

    const [currentDatasetIndex, setCurrentDatasetIndex] = useState("0")
    const [categoryList, setCategoryList] = useState(categories[0])
    const [category, setCategory] = useState(categoryList[0])
    const [resultAvailable, setResultAvailable] = useState(true)
    const [resultStat, setResultStat] = useState([{}])
    const [accStat, setAccStat] = useState([{}])

    const loaderActive = useSelector(state => state.loaderActive)
    const [tweetListSample, setTweetListSample] = useState([{}])
    const [tweetListReadFinished, setTweetListReadFinished] = useState(false)
    const dispatch = useDispatch()


    //For the dataset name
    const datasetUsed = useSelector(state => state.data)
    //Change the dataset name here freely
    const datasetList = ["Dataset 1", "Dataset 2"]
    
    // Fetch the data based on the chosen dataset name
    async function fetchData(datasetIndex) {

        const response = await fetch(datasetURL[datasetIndex])
        const reader = response.body.getReader()
        const result = await reader.read() // raw array

        const decoder = new TextDecoder('utf-8')
        const csv = decoder.decode(result.value) // the csv text
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

                setTweetListSample(tweetData);
                // setTweetListReadFinished(true);
            }
        }) // object with { data, errors, meta }

    }

    // CHECK here if the production version has been uncommented and local development is commented
    useEffect(() => {
        //----Production version-----
        // fetchData(datasetIndex);
        //----Umar Local Development-----
        processCSVLocal(datasetIndex)
        //-------------------------------
        console.log("DATASET CHANGED");
        console.log(datasetIndex);

        setResultStat(resultStatValues[datasetIndex]);
    }, [datasetIndex])

    // Change the category based on the chosen index
    function changeCategory(index) {
        return () => {
            setCategory(categoryList[index])
        }
    }

    // Process the csv for dataset for local development
    function processCSVLocal(datasetIndex) {
        const csvNames = [require("../testTweet_withPrediction_david.csv"), require("../testTweet_withPrediction_david.csv")]
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
                console.log(tweetData)
                // setTweetListReadFinished(true);
            }
        }) // object with { data, errors, meta }
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

    // Handle the dataset change during selection
    function handleDatasetChange(datasetIndex) {
        // CHECK here if the production version has been uncommented and local development is commented
        if(currentDatasetIndex != datasetIndex) {
            //----Production version----
            // fetchData(parseInt(datasetIndex));
            //----Umar Local Development-----
            processCSVLocal(0)
            //-------------------------------
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
                    <DataTable categoryList={categoryList[0]} categoryList2={categoryList[1]} tweetListSample={tweetListSample} datasetIndex={datasetIndex} testFlag={true} dataAvailable={true} wordList={[]}/> 
                </div>
                <div className='interactive-right'>
                    <div id='interactive-controller'>
                        <div className='d-flex interact-tab'> 
                            <div style={{padding: "1rem"}}>
                                <h5> Choose a dataset: </h5>
                            </div>
                            <VisualDataset onChange={handleDatasetChange} testFlag={true}/>
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