import React, {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {updateResult, deactivateLoader} from "../actions"
import DropdownButton from "react-bootstrap/DropdownButton"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Form from "react-bootstrap/Form"
import Pagination from 'react-bootstrap/Pagination'
import Dropdown from "react-bootstrap/Dropdown"
import {Bar} from 'react-chartjs-2'
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import "../style/DataTable.css"


const DataTable = (props) => {
    const categoryList = props.categoryList
    const categoryList2 = props.categoryList2
    const tweetListSample = props.tweetListSample //What the data is passed as to this component
    const datasetIndex = parseInt(props.datasetIndex) //Index of the dataset that is used currently
    const updateRes = useSelector(state => state.updateResult) //Whether a new update need to be refreshed
    const dispatch = useDispatch()
    const server_data = 'http://127.0.0.1:5000/data' // Edit this in production version to get the model accuracy statistic
    
    const [labelActive, setLabelActive] = useState([true, true, true])
    const [currPage, setCurrPage] = useState(1)
    const [filterTweet, setFilterTweet] = useState(tweetListSample.length)
    const [update, setUpdate] = useState(false) //To update the table
    const [updatedData, setUpdatedData] = useState(null) //Updated data, if not exists it's null
    const [numTweet, setNumTweet] = useState(10)
    const [dataExplore, setDataExplore] = useState("Table")
    const [wordFilteredTweet, setWordFilteredTweet] = useState(tweetListSample)

    //The dataview options are ['general', 'white-only', 'black-only', 'keyword']
    const [graphIndex, setGraphIndex] = useState(0)
    const [radioIndex, setRadioIndex] = useState(0)

    const dataViewList = ['general distribution', 'white-only distribution', 'black-only distribution', 'keyword distribution']

    //For the dataset name
    const datasetUsed = useSelector(state => state.data)
    //Change the dataset name here freely
    const datasetList = ["DataName1", "DataName2"]

    const classificationLabels = [
        ['Hateful', 'Offensive', 'Neither'],
        ['Normal', 'Hateful'],
        ['Positive', 'Negative'],
    ]

    const testLabels = ['African-A', 'Standard-A']

    const radioLabels = [
        [ // david
            [], // total label statistics
            ['Total', '1-gram', '2-gram', '3-gram'], // total
            ['Total', '1-gram', '2-gram', '3-gram'], // 0-only
            ['Total', '1-gram', '2-gram', '3-gram'], // 1-only
            ['Total', '1-gram', '2-gram', '3-gram'], // 2-only
        ],
        [ // david
            [], // total label statistics
            ['Total', '1-gram', '2-gram', '3-gram'], // total
            ['Total', '1-gram', '2-gram', '3-gram'], // 0-only
            ['Total', '1-gram', '2-gram', '3-gram'], // 1-only
        ]
    ]

    const graphNames = [
        [ // david
            {
                'category': 'General statistics',
                'graphs': [
                    {
                        'label': "Label distribution",
                        'graphIndex': 0
                    },
                    {
                        'label': "N-gram distribution",
                        'graphIndex': 1
                    },
                    {
                        'label': "N-gram distribution of 'Hateful' tweet",
                        'graphIndex': 2
                    },
                    {
                        'label': "N-gram distribution of 'Abusive' tweet",
                        'graphIndex': 3
                    },
                    {
                        'label': "N-gram distribution of 'Neither' tweet",
                        'graphIndex': 4
                    },
                ]
            },
        ],
        [ // hate speech
            {
                'category': 'General statistics',
                'graphs': [
                    {
                        'label': "Label distribution",
                        'graphIndex': 0
                    },
                    {
                        'label': "N-gram distribution",
                        'graphIndex': 1
                    },
                    {
                        'label': "N-gram distribution of 'Normal' tweet",
                        'graphIndex': 2
                    },
                    {
                        'label': "N-gram distribution of 'Hateful' tweet",
                        'graphIndex': 3
                    },
                ]
            },
        ]
    ]

    const graphData = [
        [ // david
            [
                {
                    'code': 'david',
                    'condition': 'total_label',
                    'label': ['hateful', 'offensive', 'neither'],
                    'data': [1430, 19190, 4163]
                }
            ],
            [
                {
                    'code': 'david',
                    'condition': 'total_total',
                    'label': ['bitch', 'hoe', 'like', 'fuck', 'pussi', 'thi', 'nigga', 'get', 'ass', 'shit', 'u', 'got', 'trash', 'wa', 'lol', 'amp', 'go', 'know', 'love', 'look', 'one', 'want', 'make', 'girl', 'say', 'call', 'yo', 'bird', 'talk', 'thi bitch'],
                    'data': [11480, 4352, 2873, 2269, 2267, 2170, 2019, 1785, 1599, 1312, 1307, 1302, 1167, 1166, 1109, 931, 912, 885, 775, 772, 762, 753, 713, 701, 688, 628, 613, 608, 603, 584]
                },
                {
                    'code': 'david',
                    'condition': 'total_1gram',
                    'label': ['bitch', 'hoe', 'like', 'fuck', 'pussi', 'thi', 'nigga', 'get', 'ass', 'shit', 'u', 'got', 'trash', 'wa', 'lol', 'amp', 'go', 'know', 'love', 'look', 'one', 'want', 'make', 'girl', 'say', 'call', 'yo', 'bird', 'talk', 'whi'],
                    'data': [11480, 4352, 2873, 2269, 2267, 2170, 2019, 1785, 1599, 1312, 1307, 1302, 1167, 1166, 1109, 931, 912, 885, 775, 772, 762, 753, 713, 701, 688, 628, 613, 608, 603, 578]
                },
                {
                    'code': 'david',
                    'condition': 'total_2gram',
                    'label': ['thi bitch', 'bad bitch', 'look like', 'ass bitch', 'bitch ass', 'like bitch', 'fuck bitch', 'bitch like', 'yo bitch', 'ass nigga', 'bitch get', 'littl bitch', 'bitch nigga', 'gt gt', 'act like', 'eat pussi', 'bitch fuck', 'bitch got', 'lil bitch', 'dumb bitch', 'white trash', 'bitch know', 'nigga bitch', 'thi hoe', 'bitch lol', 'feel like', 'got hoe', 'bitch bitch', 'bitch love', 'bitch u'],
                    'data': [584, 332, 309, 257, 252, 252, 249, 209, 190, 179, 162, 140, 137, 137, 134, 134, 119, 119, 105, 101, 101, 98, 94, 94, 93, 91, 91, 88, 87, 87]
                },
                {
                    'code': 'david',
                    'condition': 'total_3gram',
                    'label': ['gt gt gt', 'bitch ass nigga', 'android iphon ipad', 'ipad sex xxx', 'iphon ipad sex', 'porn android iphon', 'bitch look like', 'lt lt lt', 'bad bitch onli', 'hoe ass nigga', 'fuck right pussi', 'bitch onli thing', 'act like bitch', 'onli thing like', 'stupid ass bitch', 'yo bitch ass', 'fuck yo bitch', 'pussi ass nigga', 'best asian massag', 'park slope top', 'pussi tast like', 'slope top rate', 'top rate spa', 'big booti hoe', 'like littl bitch', 'bitch bitch bitch', 'pussi smell like', 'fuck bitch get', 'big booti bitch', 'look like bitch'],
                    'data': [93, 65, 48, 48, 48, 48, 37, 35, 31, 30, 26, 25, 24, 24, 24, 23, 22, 20, 19, 19, 19, 19, 19, 18, 18, 17, 17, 16, 15, 15]
                },
            ],
            [
                {
                    'code': 'david',
                    'condition': '0_total',
                    'label': ['bitch', 'faggot', 'fuck', 'nigga', 'like', 'nigger', 'ass', 'white', 'thi', 'trash', 'fag', 'u', 'hoe', 'get', 'hate', 'retard', 'shit', 'white trash', 'peopl', 'look', 'pussi', 'go', 'amp', 'got', 'wa', 'hi', 'lol', 'say', 'call', 'know'],
                    'data': [269, 253, 222, 216, 176, 170, 139, 130, 115, 114, 112, 105, 99, 82, 70, 65, 62, 62, 59, 58, 53, 52, 50, 50, 50, 49, 49, 46, 45, 45]
                },
                {
                    'code': 'david',
                    'condition': '0_1gram',
                    'label': ['bitch', 'faggot', 'fuck', 'nigga', 'like', 'nigger', 'ass', 'white', 'thi', 'trash', 'fag', 'u', 'hoe', 'get', 'hate', 'retard', 'shit', 'peopl', 'look', 'pussi', 'go', 'amp', 'got', 'wa', 'hi', 'lol', 'say', 'call', 'know', 'black'],
                    'data': [269, 253, 222, 216, 176, 170, 139, 130, 115, 114, 112, 105, 99, 82, 70, 65, 62, 59, 58, 53, 52, 50, 50, 50, 49, 49, 46, 45, 45, 43]
                },
                {
                    'code': 'david',
                    'condition': '0_2gram',
                    'label': ['white trash', 'ass nigga', 'look like', 'fuck faggot', 'bitch ass', 'bitch nigga', 'nigga bitch', 'faggot ass', 'full white', 'act like', 'ass bitch', 'thi bitch', 'thi nigga', 'fuck bitch', 'fuck u', 'happi birthday', 'uncl tom', 'white peopl', 'ass hoe', 'bitch fuck', 'black peopl', 'get fuck', 'like bitch', 'like fuck', 'nigga nigga', 'stupid nigger', 'ugli bitch', 'color folk', 'feel like', 'fuck nigga'],
                    'data': [62, 31, 27, 19, 15, 13, 13, 10, 10, 9, 9, 9, 9, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 6]
                },
                {
                    'code': 'david',
                    'condition': '0_3gram',
                    'label': ['full white trash', 'bitch ass nigga', 'mani nigger store', 'nigga nigga nigga', 'pussi ass nigga', 'bitch look like', 'creepi ass cracker', 'da color folk', 'everi spic cop', 'got nigga amp', 'happi birthday faggot', 'hoe ass nigga', 'mean white trash', 'onli white trash', 'shit like fuck', 'uncl tom ass', 'act like one', 'african american proud', 'amp got bitch', 'ass nigga bitch', 'asshol nigger look', 'babi new black', 'bag head anyway', 'bald head bitch', 'bitch made nigga', 'black ghetto trash', 'california full white', 'call peopl nigger', 'call white trash', 'caus look like'],
                    'data': [10, 9, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
                },
            ],
            [
                {
                    'code': 'david',
                    'condition': '1_total',
                    'label': ['bitch', 'hoe', 'like', 'pussi', 'fuck', 'nigga', 'thi', 'get', 'ass', 'shit', 'got', 'u', 'lol', 'wa', 'know', 'go', 'amp', 'love', 'girl', 'want', 'look', 'one', 'thi bitch', 'yo', 'say', 'make', 'bad', 'call', 'talk', 'whi'],
                    'data': [11200, 4206, 2381, 2207, 2047, 1803, 1734, 1484, 1457, 1245, 1147, 1087, 913, 882, 744, 721, 704, 638, 619, 598, 582, 572, 571, 569, 553, 531, 523, 501, 493, 472]                },
                {
                    'code': 'david',
                    'condition': '1_1gram',
                    'label': ['bitch', 'hoe', 'like', 'pussi', 'fuck', 'nigga', 'thi', 'get', 'ass', 'shit', 'got', 'u', 'lol', 'wa', 'know', 'go', 'amp', 'love', 'girl', 'want', 'look', 'one', 'yo', 'say', 'make', 'bad', 'call', 'talk', 'whi', 'ya'],
                    'data': [11200, 4206, 2381, 2207, 2047, 1803, 1734, 1484, 1457, 1245, 1147, 1087, 913, 882, 744, 721, 704, 638, 619, 598, 582, 572, 569, 553, 531, 523, 501, 493, 472, 457]
                },
                {
                    'code': 'david',
                    'condition': '1_2gram',
                    'label': ['thi bitch', 'bad bitch', 'ass bitch', 'like bitch', 'fuck bitch', 'bitch ass', 'look like', 'bitch like', 'yo bitch', 'bitch get', 'ass nigga', 'littl bitch', 'eat pussi', 'bitch nigga', 'act like', 'bitch got', 'gt gt', 'bitch fuck', 'lil bitch', 'dumb bitch', 'bitch know', 'thi hoe', 'bitch lol', 'got hoe', 'bitch bitch', 'bitch love', 'bitch u', 'got bitch', 'nigga bitch', 'fat bitch'],
                    'data': [571, 330, 248, 245, 241, 237, 221, 205, 186, 160, 148, 136, 133, 124, 119, 118, 116, 112, 103, 98, 96, 94, 90, 90, 87, 86, 84, 81, 81, 80]
                },
                {
                    'code': 'david',
                    'condition': '1_3gram',
                    'label': ['gt gt gt', 'bitch ass nigga', 'android iphon ipad', 'ipad sex xxx', 'iphon ipad sex', 'porn android iphon', 'bitch look like', 'bad bitch onli', 'hoe ass nigga', 'fuck right pussi', 'bitch onli thing', 'lt lt lt', 'act like bitch', 'onli thing like', 'stupid ass bitch', 'fuck yo bitch', 'yo bitch ass', 'pussi tast like', 'big booti hoe', 'like littl bitch', 'bitch bitch bitch', 'pussi smell like', 'fuck bitch get', 'pussi ass nigga', 'big booti bitch', 'look like bitch', 'type bad bitch', 'bitch talk shit', 'get thi bitch', 'thi bitch said'],
                    'data': [82, 56, 45, 45, 45, 45, 34, 31, 27, 26, 25, 25, 24, 24, 24, 22, 22, 19, 18, 18, 17, 17, 16, 16, 15, 15, 15, 14, 14, 14]
                },
            ],
            [
                {
                    'code': 'david',
                    'condition': '2_total',
                    'label': ['trash', 'bird', 'thi', 'like', 'yanke', 'charli', 'wa', 'yellow', 'get', 'amp', 'one', 'lol', 'make', 'go', 'hi', 'look', 'color', 'ghetto', 'browni', 'monkey', 'u', 'want', 'game', 'got', 'oreo', 'love', 'day', 'ha', 'know', 'man'],
                    'data': [698, 477, 321, 316, 284, 264, 234, 223, 219, 177, 150, 147, 143, 139, 139, 132, 126, 118, 117, 115, 115, 113, 106, 105, 105, 103, 99, 97, 96, 96]
                },
                {
                    'code': 'david',
                    'condition': '2_1gram',
                    'label': ['trash', 'bird', 'thi', 'like', 'yanke', 'charli', 'wa', 'yellow', 'get', 'amp', 'one', 'lol', 'make', 'go', 'hi', 'look', 'color', 'ghetto', 'browni', 'monkey', 'u', 'want', 'game', 'got', 'oreo', 'love', 'day', 'ha', 'know', 'man'],
                    'data': [698, 477, 321, 316, 284, 264, 234, 223, 219, 177, 150, 147, 143, 139, 139, 132, 126, 118, 117, 115, 115, 113, 106, 105, 105, 103, 99, 97, 96, 96]
                },
                {
                    'code': 'david',
                    'condition': '2_2gram',
                    'label': ['look like', 'flappi bird', 'charli crist', 'charli sheen', 'earli bird', 'trash talk', 'charli brown', 'wa trash', 'derek jeter', 'charli baker', 'asian massag', 'best asian', 'park slope', 'rate spa', 'slope top', 'top rate', 'gt gt', 'talk trash', 'yanke fan', 'yanke stadium', 'lt lt', 'planet ape', 'thi year', 'yanke game', 'rick scott', 'ice cream', 'massag park', 'take trash', 'bird get', 'like trash'],
                    'data': [61, 47, 35, 29, 28, 28, 26, 26, 25, 23, 19, 19, 19, 19, 19, 19, 18, 18, 18, 18, 16, 16, 16, 16, 15, 14, 14, 14, 13, 13]
                },
                {
                    'code': 'david',
                    'condition': '2_3gram',
                    'label': ['best asian massag', 'park slope top', 'slope top rate', 'top rate spa', 'asian massag park', 'massag park slope', 'bird get worm', 'earli bird get', 'gt gt gt', 'lt lt lt', 'play flappi bird', 'class orient massag', 'grand open top', 'new york yanke', 'one man trash', 'open top class', 'orient massag perfect', 'top class orient', 'man trash anoth', 'charli brown rejectedpeanutsspeci', 'like yellow starburst', 'look like trash', 'oreo ice cream', 'rose color glass', 'trash anoth man', 'anoth man treasur', 'asian massag brooklyn', 'bird catch worm', 'brooklyn park slope', 'disrupt shylock bank'],
                    'data': [19, 19, 19, 19, 14, 14, 12, 11, 10, 10, 10, 8, 8, 8, 8, 8, 8, 8, 7, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5]
                },
            ],
        ],
        [ // hatespeech
            [
                {
                    'code': 'hatespeech',
                    'condition': 'total_label',
                    'label': ['normal', 'hateful'],
                    'data': [12522, 7478]
                },
            ],
            [
                {
                    'code': 'hatespeech',
                    'condition': 'total_total',
                    'label': ['fuck', 'thi', 'like', 'get', 'amp', 'wa', 'one', 'peopl', 'know', 'go', 'hi', 'u', 'ass', 'time', 'bitch', 'day', 'make', 'look', 'say', 'want', 'whi', 'love', 'ha', 'hate', 'see', 'think', 'would', 'need', 'got', 'idiot'],
                    'data': [4789, 2643, 1636, 1242, 1080, 1068, 908, 862, 842, 818, 756, 735, 708, 706, 688, 676, 668, 665, 656, 655, 602, 591, 568, 567, 543, 523, 515, 492, 487, 486]
                },
                {
                    'code': 'hatespeech',
                    'condition': 'total_1gram',
                    'label': ['fuck', 'thi', 'like', 'get', 'amp', 'wa', 'one', 'peopl', 'know', 'go', 'hi', 'u', 'ass', 'time', 'bitch', 'day', 'make', 'look', 'say', 'want', 'whi', 'love', 'ha', 'hate', 'see', 'think', 'would', 'need', 'got', 'idiot'],
                    'data': [4789, 2643, 1636, 1242, 1080, 1068, 908, 862, 842, 818, 756, 735, 708, 706, 688, 676, 668, 665, 656, 655, 602, 591, 568, 567, 543, 523, 515, 492, 487, 486]
                },
                {
                    'code': 'hatespeech',
                    'condition': 'total_2gram',
                    'label': ['thi fuck', 'look like', 'get fuck', 'like thi', 'feel like', 'ugli ass', 'found transpond', 'transpond snail', 'ass bitch', 'one person', 'automat check', 'unfollow automat', 'like video', 'bad bitch', 'fuck hate', 'got fuck', 'reason whi', 'oh god', 'know fuck', 'bitch like', 'april fool', 'gt gt', 'wa fuck', 'wanna fuck', 'thi week', 'realli fuck', 'thi nigga', 'call racist', 'georg bush', 'year old'],
                    'data': [235, 132, 126, 123, 103, 101, 97, 97, 91, 90, 77, 77, 73, 72, 69, 67, 66, 63, 61, 57, 56, 56, 56, 55, 54, 52, 51, 50, 50, 50]
                },
                {
                    'code': 'hatespeech',
                    'condition': 'total_3gram',
                    'label': ['found transpond snail', 'unfollow automat check', 'bush call racist', 'fuck georg bush', 'georg bush call', 'know fuck georg', 'follow one person', 'one person unfollow', 'person unfollow automat', 'ugli ass bitch', 'sorri ugli ass', 'bitch like thi', 'would even say', 'like thi would', 'thi would even', 'ass bitch like', 'one person follow', 'let fuck go', 'ad video playlist', 'even say oh', 'say oh god', 'follow peopl unfollow', 'peopl unfollow automat', 'eat food cold', 'food cold flourish', 'happen separ yo', 'nigga eat food', 'self nigga eat', 'separ yo self', 'thi happen separ'],
                    'data': [97, 77, 48, 48, 48, 48, 47, 47, 47, 44, 43, 42, 40, 38, 37, 36, 34, 33, 32, 32, 32, 30, 30, 29, 29, 29, 29, 29, 29, 29]
                },
            ],
            [
                {
                    'code': 'hatespeech',
                    'condition': '0_total',
                    'label': ['thi', 'like', 'amp', 'wa', 'one', 'get', 'peopl', 'love', 'time', 'day', 'go', 'know', 'make', 'hi', 'new', 'look', 'ha', 'today', 'want', 'see', 'thank', 'say', 'us', 'follow', 'via', 'would', 'good', 'u', 'think', 'work'],
                    'data': [1406, 896, 820, 794, 695, 685, 548, 544, 541, 517, 486, 476, 474, 471, 454, 413, 410, 406, 405, 404, 404, 369, 348, 347, 343, 343, 338, 338, 334, 327]
                },
                {
                    'code': 'hatespeech',
                    'condition': '0_1gram',
                    'label': ['thi', 'like', 'amp', 'wa', 'one', 'get', 'peopl', 'love', 'time', 'day', 'go', 'know', 'make', 'hi', 'new', 'look', 'ha', 'today', 'want', 'see', 'thank', 'say', 'us', 'follow', 'via', 'would', 'good', 'u', 'think', 'work'],
                    'data': [1406, 896, 820, 794, 695, 685, 548, 544, 541, 517, 486, 476, 474, 471, 454, 413, 410, 406, 405, 404, 404, 369, 348, 347, 343, 343, 338, 338, 334, 327]
                },
                {
                    'code': 'hatespeech',
                    'condition': '0_2gram',
                    'label': ['found transpond', 'transpond snail', 'one person', 'automat check', 'unfollow automat', 'look like', 'like video', 'feel like', 'follow one', 'person unfollow', 'peopl follow', 'year old', 'gt gt', 'like thi', 'thi week', 'happi birthday', 'person follow', 'ad video', 'thi year', 'video playlist', 'everi time', 'follow peopl', 'last night', 'peopl unfollow', 'april fool', 'thi one', 'best friend', 'new york', 'first time', 'white hous'],
                    'data': [96, 96, 87, 77, 77, 72, 71, 49, 47, 47, 45, 45, 43, 43, 43, 42, 34, 32, 32, 32, 31, 31, 30, 30, 29, 29, 28, 28, 27, 27]
                },
                {
                    'code': 'hatespeech',
                    'condition': '0_3gram',
                    'label': ['found transpond snail', 'unfollow automat check', 'follow one person', 'one person unfollow', 'person unfollow automat', 'one person follow', 'ad video playlist', 'follow peopl unfollow', 'peopl unfollow automat', 'peopl follow one', 'person follow one', 'gt gt gt', 'amaz encount trecru', 'giant sea monster', 'monster amaz encount', 'peopl follow peopl', 'sea monster amaz', 'snail giant sea', 'transpond snail giant', 'person follow peopl', 'rain today mm', 'time great show', 'yasss time great', 'april fool day', 'thank recent follow', 'abc news report', 'aircraft base befor', 'base befor strike', 'c rain today', 'equip aircraft base']
                    ,
                    'data': [96, 77, 47, 47, 47, 34, 32, 30, 30, 27, 20, 19, 16, 16, 16, 16, 16, 16, 16, 14, 12, 12, 12, 11, 11, 10, 10, 10, 10, 10]
                },
            ],
            [
                {
                    'code': 'hatespeech',
                    'condition': 'total_1gram',
                    'label': ['fuck', 'thi', 'like', 'bitch', 'ass', 'get', 'hate', 'idiot', 'nigga', 'u', 'know', 'bad', 'go', 'peopl', 'shit', 'whi', 'say', 'hi', 'wa', 'stupid', 'amp', 'look', 'want', 'ugli', 'got', 'thi fuck', 'damn', 'even', 'one', 'im'],
                    'data': [4661, 1237, 740, 673, 660, 557, 491, 461, 435, 397, 366, 333, 332, 314, 306, 289, 287, 285, 274, 270, 260, 252, 250, 249, 246, 230, 228, 220, 213, 210]
                },
                {
                    'code': 'hatespeech',
                    'condition': '1_1gram',
                    'label': ['fuck', 'thi', 'like', 'bitch', 'ass', 'get', 'hate', 'idiot', 'nigga', 'u', 'know', 'bad', 'go', 'peopl', 'shit', 'whi', 'say', 'hi', 'wa', 'stupid', 'amp', 'look', 'want', 'ugli', 'got', 'damn', 'even', 'one', 'im', 'make'],
                    'data': [4661, 1237, 740, 673, 660, 557, 491, 461, 435, 397, 366, 333, 332, 314, 306, 289, 287, 285, 274, 270, 260, 252, 250, 249, 246, 228, 220, 213, 210, 194]
                },
                {
                    'code': 'hatespeech',
                    'condition': '1_2gram',
                    'label': ['thi fuck', 'get fuck', 'ugli ass', 'ass bitch', 'like thi', 'bad bitch', 'got fuck', 'fuck hate', 'look like', 'know fuck', 'oh god', 'bitch like', 'wa fuck', 'feel like', 'wanna fuck', 'thi nigga', 'call racist', 'thi stupid', 'bush call', 'fuck georg', 'georg bush', 'fuck go', 'realli fuck', 'reason whi', 'im fuck', 'let fuck', 'stop fuck', 'sorri ugli', 'stupid ass', 'fuck thing'],
                    'data': [230, 124, 97, 89, 80, 72, 67, 66, 60, 59, 57, 55, 55, 54, 53, 50, 48, 48, 47, 47, 47, 46, 46, 46, 44, 44, 43, 42, 41, 40]
                },
                {
                    'code': 'hatespeech',
                    'condition': '1_3gram',
                    'label': ['bush call racist', 'fuck georg bush', 'georg bush call', 'know fuck georg', 'ugli ass bitch', 'sorri ugli ass', 'bitch like thi', 'would even say', 'like thi would', 'thi would even', 'ass bitch like', 'let fuck go', 'even say oh', 'say oh god', 'eat food cold', 'food cold flourish', 'happen separ yo', 'nigga eat food', 'self nigga eat', 'separ yo self', 'thi happen separ', 'yo self nigga', 'either side side', 'fuck go nowornev', 'happen song video', 'preorder let fuck', 'side fuck way', 'side side fuck', 'song video preorder', 'video preorder let'],
                    'data': [47, 47, 47, 47, 42, 41, 40, 38, 36, 35, 34, 33, 30, 30, 29, 29, 29, 29, 29, 29, 29, 29, 27, 27, 27, 27, 27, 27, 27, 27]
                }
            ]
        ]
            
    ];

    function getLabel(graphindex) {
        for(var i=0;i<graphNames[datasetIndex].length;i++) {
            for(var j=0;j<graphNames[datasetIndex][i].graphs.length;j++) {
                if (graphNames[datasetIndex][i].graphs[j].graphIndex == graphindex)
                    return graphNames[datasetIndex][i].graphs[j].label
            }
        }

        return -1;
    }

    const barData = {
        labels: graphData[datasetIndex].length > graphIndex && graphData[datasetIndex][graphIndex].length > radioIndex ? graphData[datasetIndex][graphIndex][radioIndex].label : [] ,
        datasets: [
            {
            label: getLabel(graphIndex),
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: graphData[datasetIndex].length > graphIndex && graphData[datasetIndex][graphIndex].length > radioIndex ? graphData[datasetIndex][graphIndex][radioIndex].data : [],
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
        setGraphIndex(0);
        setRadioIndex(0);
    }, [datasetIndex]);

    useEffect(() => {
        setRadioIndex(0);
    }, [graphIndex]);

    useEffect(() => {
        setFilterTweet(tweetListSample.length);
    }, [tweetListSample.length])

    useEffect(() => {
        handleWordList()
    }, [props.wordList, tweetListSample])


    // Detect the update result button push. Used in using custom dataset
    useEffect(() => {
        //Check if update res is true AND if there is any change in the data
        if (updateRes && updatedData !== null) {
            console.log("Updating the result...")
            // Send the file to the server
            // Include the label for result evaluation
            const data_json = {
                "data": updatedData,
                "label": classificationLabels[datasetIndex]
            }

            const otherParam = {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_json),
                method: "POST",
            }
            fetch(server_data, otherParam).then(
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
                            class: classificationLabels[datasetIndex][parseInt(key)],
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
                setUpdatedData(null)
                dispatch(updateResult("UPDATE_RESULT")) // The variable is set again to true in order to trigger the result change in the Result.js
            })
            .catch(err => console.log(err))
            setUpdate(true)
        }
    }, [updateRes])

    //Create the table based on the filter
    function returnFilteredTweet(tweet_list, size) {
        let filtered_tweet = [...tweet_list]
        if (props.testFlag) {
            var test = tweetListSample[1]
            if (typeof test !== "undefined"){
                var filtered_tweet1 = filtered_tweet.filter((item) => labelActive[0][categoryList.findIndex((cat_item) => cat_item === item.label)])
                filtered_tweet = filtered_tweet1.filter((item) => labelActive[1][categoryList2.findIndex((cat_item) => cat_item === item.predLabel)])
            }
        }
        else {
            filtered_tweet = filtered_tweet.filter((item) => labelActive[categoryList.findIndex((cat_item) => cat_item === item.label)])
        }
        let paged_tweet = filtered_tweet.slice(0+size*(currPage-1), size*currPage)

        if (update) {
            setFilterTweet(filtered_tweet.length)
            setUpdate(false)
        }
        return paged_tweet.map((item, i) => 
            <tr> 
                <th style={{width: "50px"}}> {size*(currPage-1)+i+1} </th>
                <td style={{textAlign: 'left'}}> {item.tweet} </td>
                <td style={{width: "150px"}}> {props.testFlag? testLabels[item.label] : classificationLabels[datasetIndex][item.label]} </td>
                {/* This is the column that only exist in the bias testing plane */}
                <td style={{width: "150px"}} className={props.testFlag? '': 'd-none'}> {classificationLabels[datasetIndex][item.predLabel]} </td>
            </tr>
        )
    }

    //Update the list of active label based on the filter
    function handleFilter(index, choice=0) {
        var new_label = [...labelActive]
        console.log(new_label)
        if (props.testFlag) {
            new_label[choice][index] = !labelActive[choice][index]
        }
        else {
            new_label[index] = !labelActive[index]
        }
        setLabelActive(new_label)
        setUpdate(true)
    }

    // Change the table if there are words entered in "associated words" bar
    function handleWordList() {
        if (props.wordList.length > 0) {
            var wordFiltered = tweetListSample.filter((entry) => props.wordList.some(word => entry.tweet.includes(word)));
            setUpdatedData(wordFiltered)
            setWordFilteredTweet(wordFiltered)
        }
        else {
            setWordFilteredTweet(tweetListSample)
        }
    }

    useEffect(() => {
        handleWordList()
        console.log(tweetListSample)
    }, [tweetListSample])

    function changePage(pagenum) {
        setCurrPage(pagenum)
    }

    // Create the pagination based on the size of dataset
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

    //Create the table itself
    function createDataExplore() {
        if (dataExplore === "Table") {
            return (<div>
                <table className='table' style={{margin: "1rem 1rem", tableLayout: "fixed"}}>
                    <thead>
                        <tr >
                            <th style={{width: "50px"}} className='align-middle'>No</th>
                            <th className='align-middle'>Tweet</th>
                            <th style={{width: "150px"}}>
                            <DropdownButton id="dropdown-basic-button" title={props.testFlag?'Dialect':'Abusive Label'} variant='secondary'>
                            <Form style={{marginLeft: "30px"}}>
                                {categoryList.map((item, i) => (
                                    <Form.Check key={i}
                                        type={'checkbox'}
                                        label={props.testFlag? testLabels[i] : classificationLabels[datasetIndex][i]}
                                        defaultChecked={labelActive[i]}
                                        onClick={() => 
                                            handleFilter(i) //Change the displayed based on the filter selected
                                        }
                                    />
                                ))}
                                </Form>
                            </DropdownButton>
                            </th>
                            {/* This is where the column that only exist in bias testing page only */}
                            { props.testFlag ?
                                <th style={{ width: "150px" }} className={props.testFlag ? '' : 'd-none'}>
                                    <DropdownButton id="dropdown-basic-button" title='Predicted Label' variant='secondary' style={{ transform: 'translateX(-15px)' }}>
                                        <Form className='text-center'>
                                            {categoryList2.map((item, i) => (
                                                <Form.Check key={i}
                                                    type={'checkbox'}
                                                    label={classificationLabels[datasetIndex][i]}
                                                    defaultChecked={labelActive.length > 1 ? labelActive[1][i]: labelActive[i] }
                                                    onClick={() => handleFilter(i, 1)}
                                                />
                                            ))}
                                        </Form>
                                    </DropdownButton>
                                </th>
                                :
                                ''
                            }
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            returnFilteredTweet(wordFilteredTweet, numTweet) //return the tweet list that has been filter
                        }
                    </tbody>
                </table>
                {createPagination(numTweet)}
            </div>)
        }
        else {
            //Return bar chart of distribution
            return (
            <div className='d-flex justify-align-center'>
                <div style={{flex: "4", marginRight: "1rem"}}>
                    <h6> List of view: </h6>
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
                <div style={{flex: "10"}}>
                    {createBarChart()}
                </div>
            </div>)
        }
    }

    // Create the bar chart
    function createBarChart() {
        switch(true){
            default:
                return (
                    <div className='barChartPlane'>
                    {radioLabels[datasetIndex][graphIndex].map((values, i) => 
                    <label>
                         <input type='radio' name ='barChartPlaneList' onClick={() => setRadioIndex(i)} checked={radioIndex === i}/> {values}
                    </label>
                    )}
                    <Bar data={barData} options={barOption}/>
                    </div>
                )
        }
    }

    //Display the data if available, otherwise return "no data" message
    function displayData() {
        if (props.dataAvailable) {
            return (
                <div className="explore-container" style={{ marginTop: "1rem", padding: "0rem 2rem", overflowY: "scroll" }}>
                    {createDataExplore()}
                </div>
            )
        }
        else {
            return (
            <div style={{ marginTop: "1rem", padding: "0rem 5rem" }}>
                <h3 style={{ marginTop: "5rem", color: "#676767" }}> No data to display </h3>
                <p> There is no data that has been submitted yet. You can upload your own data on the dataset section, and make sure to submit the data. </p>
            </div>
            )
        }
    }

    return (
        <div>
            <h1> Dataset {props.testFlag? "For Bias Testing" : "Exploration"} {/*datasetList[datasetUsed]*/}</h1>
            {props.testFlag || !props.dataAvailable ? <div></div>:
                <div className='d-flex justify-content-center align-item-center' style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                    <h5 style={{ marginRight: "1rem", paddingTop: "0.5rem" }}> Choose a data representation: </h5>
                    {/* <DropdownButton title={dataExplore} className='btn-green'>
                        {['Table', 'Graph'].map((item, i) => {
                            return (<Dropdown.Item key={i} onClick={() => setDataExplore(item)}> {item} </Dropdown.Item>)
                        })}
                    </DropdownButton> */}
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle id="green-1" style={{backgroundColor: "#2A6350", borderColor: "#2A6350"}}>{dataExplore}</Dropdown.Toggle>
                        <Dropdown.Menu>
                        {['Table', 'Graph'].map((item, i) => {
                            return (<Dropdown.Item key={i} onClick={() => setDataExplore(item)}> {item} </Dropdown.Item>)
                        })}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            }
            {displayData()}
        </div>
        
    )
}

export default DataTable
