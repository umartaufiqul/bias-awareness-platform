import React, {useState, useEffect} from "react"
import DropdownButton from "react-bootstrap/DropdownButton"
import Form from "react-bootstrap/Form"
import Pagination from 'react-bootstrap/Pagination'
import Dropdown from "react-bootstrap/Dropdown"
import {Bar} from 'react-chartjs-2'


const DataTable = (props) => {
    const categoryList = props.categoryList
    const tweetListSample = props.tweetListSample
    
    console.log(props);

    const [labelActive, setLabelActive] = useState([])
    const [currPage, setCurrPage] = useState(1)
    const [filterTweet, setFilterTweet] = useState(tweetListSample.length)
    const [update, setUpdate] = useState(false)
    const [numTweet, setNumTweet] = useState(10)
    const [dataExplore, setDataExplore] = useState("Table")

    const barData = {
        // labels: [0, 1, 2],
        // dataset: [{
        //     label: 'My First dataset',
        //     backgroundColor: 'rgba(255,99,132,0.2)',
        //     borderColor: 'rgba(255,99,132,1)',
        //     borderWidth: 1,
        //     hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        //     hoverBorderColor: 'rgba(255,99,132,1)',
        //     data: [0.5, 0.3, 0.2]
        // }]
        labels: [0, 1, 2],
        datasets: [
            {
            label: 'Tweet Distribution',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [0.5, 0.6, 0.7]
            }
        ]
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
    
    useEffect(() => {
        setFilterTweet(tweetListSample.length);
    }, [tweetListSample.length])
    useEffect(() => {
        var label = []
        for (var i = 0; i < categoryList.length; i++) {
            label.push(true)
        }
        setLabelActive(label)
    }, [categoryList.length])

    function returnFilteredTweet(tweet_list, size) {
        let filtered_tweet = [...tweet_list]
        filtered_tweet = filtered_tweet.filter((item) => labelActive[categoryList.findIndex((cat_item) => cat_item === item.label)])
        let paged_tweet = filtered_tweet.slice(0+size*(currPage-1), size*currPage)

        if (update) {
            console.log("here");
            setFilterTweet(filtered_tweet.length)
            setUpdate(false)
        }
        return paged_tweet.map((item, i) => 
            <tr> 
                <th style={{width: "50px"}}> {size*(currPage-1)+i+1} </th>
                <td> {item.tweet} </td>
                <td style={{width: "150px"}}> {item.label} </td>
            </tr>
        )
    }

    
    function handleFilter(index) {
        var new_label = [...labelActive]
        new_label[index] = !labelActive[index]
        setLabelActive(new_label)
        setUpdate(true)
    }

    function changePage(pagenum) {
        setCurrPage(pagenum)
    }

    function createPagination(size) {
        //Calculate the number of pagination
        const pageNum = Math.ceil(filterTweet/size)
        let pageItem = [<Pagination.First style={{width: "auto", margin: "0rem"}} onClick={() => setCurrPage(1)}/>,
            <Pagination.Prev style={{width: "auto", margin: "0rem"}} disabled={currPage === 1} onClick={() => setCurrPage(currPage-1)}/>]
        if (pageNum > 3) {
            if (currPage > 3) {
                pageItem.push(<Pagination.Ellipsis style={{width: "auto", margin: "0rem"}} disabled/>)
            }
            if (currPage >= pageNum-2 && currPage <= pageNum) {
                for (let i = pageNum-2; i < pageNum + 1; i++) {
                    pageItem.push(<Pagination.Item key={i} style={{width: "auto", margin: "0rem"}} className={i === currPage ? 'page-item active' : 'page-item'} onClick={() => changePage(i)}> {i} </Pagination.Item>)
                }
            }
            else if (currPage >= 1 && currPage <= 3) {
                for (let i = 1; i < 4; i++) {
                    pageItem.push(<Pagination.Item key={i} style={{width: "auto", margin: "0rem"}} className={i === currPage ? 'page-item active' : 'page-item'} onClick={() => changePage(i)}> {i} </Pagination.Item>)
                }
            }
            else {
                for (let i = currPage-1; i < 2+currPage && i < pageNum+1; i++) {
                    pageItem.push(<Pagination.Item key={i} style={{width: "auto", margin: "0rem"}} className={i === currPage ? 'page-item active' : 'page-item'} onClick={() => changePage(i)}> {i} </Pagination.Item>)
                }
            }
            if (currPage < pageNum-2) {
                pageItem.push(<Pagination.Ellipsis style={{width: "auto", margin: "0rem"}} disabled/>)
            }
        }
        else {
            for (let i = 0; i < pageNum && i < pageNum+1; i++) {
                pageItem.push(<Pagination.Item key={i+1} style={{width: "auto", margin: "0rem"}} className={i+1 === currPage ? 'page-item active' : 'page-item'} onClick={() => changePage(i+1)}> {i+1} </Pagination.Item>)
            }
        }
        pageItem.push(<Pagination.Next style={{width: "auto", margin: "0rem"}} disabled={currPage === pageNum} onClick={() => setCurrPage(currPage+1)}/>)
        pageItem.push(<Pagination.Last style={{width: "auto", margin: "0rem"}} onClick={() => setCurrPage(pageNum)}/>)
        return (
        <Pagination className='justify-content-center' style={{padding: "0rem"}}>
            {pageItem}
        </Pagination>
        )
    }

    function createDataExplore() {
        if (dataExplore === "Table") {
            return (<div>
                <table className='table'style={{margin: "2rem 1rem", tableLayout: "fixed"}}>
                    <thead>
                        <tr>
                            <th style={{width: "50px"}}>No</th>
                            <th >Tweet</th>
                            <th style={{width: "150px"}}>
                            <DropdownButton id="dropdown-basic-button" title='Label'>
                            <Form className='text-center'>
                                {categoryList.map((item, i) => (
                                    <Form.Check key={i}
                                        type={'checkbox'}
                                        label={item}
                                        defaultChecked={labelActive[i]}
                                        onClick={() => handleFilter(i)}
                                    />
                                ))}
                                </Form>
                            </DropdownButton>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { returnFilteredTweet(tweetListSample, numTweet)}
                    </tbody>
                </table>
                {createPagination(numTweet)}
            </div>)
        }
        else {
            //Return bar chart of distribution
            return (<Bar data={barData} options={barOption}/>)
        }
    }

    return (
        <div className="explore-container" style={{marginTop: "1rem", padding: "0rem 2rem", overflowY: "scroll"}}>
            <h1 > Exploring Dataset </h1>
            <div className='d-flex justify-content-center align-item-center'>
            <h5 style={{marginRight: "1rem", paddingTop: "0.5rem"}}> Choose a data representation: </h5>
            <DropdownButton title={dataExplore}> 
                {['Table', 'Graph'].map((item, i) => {
                    return (<Dropdown.Item key={i} onClick={() => setDataExplore(item)}> {item} </Dropdown.Item>)
                })}
            </DropdownButton>
            </div>
            {createDataExplore()}
            
        </div>
    )
}

export default DataTable