import React, { useState, useEffect, useCallback } from "react"
import "../style/Visualization.css"
import { useDispatch, useSelector } from "react-redux"
import ScatterChart from "../components/ScatterChart"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import BiasResult from "../components/BiasResult"
import Result from "../components/Result"
import DataTable from "../components/DataTable"
import Papa from 'papaparse'

const BiasTesting = (props) => {
    const datasetURL = 'http://3.35.21.90:3000/bias-awareness-platform/testTweet.csv';
    const datasetIndex = useSelector(state => state.data);

    console.log(datasetIndex);

    const categories = [
        ["0", "1"],
    ];

    const resultStatValues = [[{
        class: "Hateful",
        pblack: 0.001,
        pwhite: 0.003,
        pblack_white: 0.005,
    }, {
        class: "Abusive",
        pblack: 0.083,
        pwhite: 0.048,
        pblack_white: 1.724
    }, {
        class: "Neither",
        pblack: 0.083,
        pwhite: 0.048,
        pblack_white: 1.724
    }
    ],

    [{
        class: "Normal",
        pblack: 0.083,
        pwhite: 0.048,
        pblack_white: 1.724
    }, {
        class: "Hateful",
        pblack: 0.083,
        pwhite: 0.048,
        pblack_white: 1.724
    }]

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
    
    async function fetchData() {
        console.log(datasetURL);

        const response = await fetch(datasetURL)
        const reader = response.body.getReader()
        const result = await reader.read() // raw array

        console.log(result)

        const decoder = new TextDecoder('utf-8')
        const csv = decoder.decode(result.value) // the csv text
        //The commented area is for umar's local development
        // const csv = require("../david_formatted.csv")
        
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
                        label: results.data[i].class
                    });
                }

                setTweetListSample(tweetData);
                // setTweetListReadFinished(true);
            }
        }) // object with { data, errors, meta }

    }

    useEffect(() => {
        fetchData();
        console.log("DATASET CHANGED");
        console.log(datasetIndex);

        setResultStat(resultStatValues[datasetIndex]);
    }, [datasetIndex])

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
            return (<DataTable categoryList={categoryList} tweetListSample={tweetListSample} datasetIndex={0} testFlag={true}/>)
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
                    <div id='visual-result'>
                        <h3> Result </h3>
                        {/*
                        <BiasResult biasStat={accStat}/>*/ }
                        <Result resultStat={resultStat} accStat={accStat} resultAvailable={resultAvailable} datasetIndex={datasetIndex} activeResult='distr'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BiasTesting