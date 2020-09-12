import React, {useState, useEffect} from "react"
import DropdownButton from "react-bootstrap/DropdownButton"
import Form from "react-bootstrap/Form"
import Pagination from 'react-bootstrap/Pagination'


const DataTable = (props) => {
    const categoryList = props.categoryList
    const tweetListSample = props.tweetListSample
    
    const [labelActive, setLabelActive] = useState([])
    const [currPage, setCurrPage] = useState(1)
    const [filterTweet, setFilterTweet] = useState(tweetListSample.length)
    const [update, setUpdate] = useState(false)
    
    useEffect(() => {
        var label = []
        for (var i = 0; i < categoryList.length; i++) {
            label.push(true)
        }
        setLabelActive(label)
    }, [categoryList.length])

    useEffect(() => {

    }, [filterTweet.length])
    function returnFilteredTweet(tweet_list, size) {
        let filtered_tweet = [...tweet_list]
        filtered_tweet = filtered_tweet.filter((item) => labelActive[categoryList.findIndex((cat_item) => cat_item === item.label)])
        let paged_tweet = filtered_tweet.slice(0+size*(currPage-1), size*currPage)
        if (update) {
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
        console.log(index)
        console.log(new_label)
        setLabelActive(new_label)
        setUpdate(true)
    }

    function changePage(pagenum) {
        setCurrPage(pagenum)
    }

    function createPagination(size) {
        //Calculate the number of pagination
        const pageNum = Math.ceil(filterTweet/size)
        console.log(pageNum)
        let pageItem = []
        for (let i = 0; i < pageNum; i++) {
            pageItem.push(<Pagination.Item key={i+1} style={{width: "auto", margin: "0rem"}} className={i+1 === currPage ? 'page-item active' : 'page-item'} onClick={() => changePage(i+1)}> {i+1} </Pagination.Item>)
        }
        return (
        <Pagination className='justify-content-center' style={{padding: "0rem"}}>
            {pageItem}
        </Pagination>
        )
    }

    return (
        <div className="explore-container" style={{marginTop: "1rem", padding: "0rem 2rem", overflowY: "scroll"}}>
            <h1 > Exploring Dataset </h1>
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
                    { returnFilteredTweet(tweetListSample, 4)}
                </tbody>
            </table>
            {/* <Pagination className='justify-content-center' style={{padding: "0rem"}}>
                <Pagination.Item style={{width: "auto", margin: "0rem"}}> 1 </Pagination.Item>
                <Pagination.Item style={{width: "auto", margin: "0rem"}}> 2 </Pagination.Item>
                <Pagination.Item style={{width: "auto", margin: "0rem"}}> 3 </Pagination.Item>
            </Pagination> */}
            {createPagination(4)}

        </div>
    )
}

export default DataTable